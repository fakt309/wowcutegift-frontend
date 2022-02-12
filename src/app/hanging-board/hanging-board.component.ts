import { Component, OnInit, HostListener, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { AsyncService } from '../async.service';

@Component({
  selector: 'app-hanging-board',
  templateUrl: './hanging-board.component.html',
  styleUrls: ['./hanging-board.component.scss']
})
export class HangingBoardComponent implements OnInit {

  constructor() { }
  start: number = 0
  translateStatic: number = 0
  translateMove: number = 0
  exact: boolean = true
  example: any = {
    left: 'The gift is',
    center: 'priceless',
    right: '(real value $0)',
    color: '#322525',
    size: 14
  }
  cost: number = 0

  transformBlock1: string = "scale(1) rotate(0deg)"
  displayBlock1: string = "flex"
  transformBlock2: string = "scale(0) rotate(180deg)"
  displayBlock2: string = "none"

  @Input('shown') shown: boolean = false

  @Output() close = new EventEmitter<void>()

  @Output() accept = new EventEmitter<any>();

  @HostBinding('style.display') display: string = 'none'
  @HostBinding('style.transform') transform: string = 'translateY(-100%)'

  @HostListener('touchstart', ['$event'])
  startTouch(e: TouchEvent): void {
    if (e.touches.length != 1) return
    this.start = e.touches[0].clientY
    this.translateMove = this.translateStatic
  }

  @HostListener('touchmove', ['$event'])
  scrollTouch(e: TouchEvent): void {
    if (e.touches.length != 1) return
    let delta: number = e.touches[0].clientY-this.start
    this.translateMove = this.translateStatic+delta
    if (this.translateMove < -window.innerHeight+150) {
      this.translateMove = -window.innerHeight+150
    } else if (this.translateMove > window.innerHeight-150) {
      this.translateMove = window.innerHeight-150
    }
  }

  @HostListener('touchend', ['$event'])
  endTouch(e: TouchEvent): void {
    this.translateStatic = this.translateMove
    this.translateMove = 0
  }

  async show() {

    this.display = 'flex'
    await AsyncService.delay(10)
    this.transform = 'translateY(0%)'
    this.shown = true
  }

  async hide() {
    this.transform = 'translateY(-100%)'
    await AsyncService.delay(300)
    this.display = 'none'
    this.shown = false
    this.translateMove = 0
    this.translateStatic = 0
  }

  async showPrice(exact: boolean) {
    this.exact = exact
    this.transformBlock1 = 'scale(0) rotate(180deg)'
    await AsyncService.delay(300)
    this.displayBlock1 = 'none'
    this.displayBlock2 = 'flex'
    await AsyncService.delay(10)
    this.transformBlock2 = 'scale(1) rotate(0deg)'
    await AsyncService.delay(300)
  }

  async backPrice() {
    this.transformBlock2 = 'scale(0) rotate(180deg)'
    await AsyncService.delay(300)
    this.displayBlock2 = 'none'
    this.displayBlock1 = 'flex'
    await AsyncService.delay(100)
    this.transformBlock1 = 'scale(1) rotate(0deg)'
    await AsyncService.delay(300)
  }

  setExample(): void {
    let val = this.cost
    if (val || val === 0) {
      if (this.exact) {
        if (val === 0) {
          this.example = {
            left: 'The gift is',
            center: 'priceless',
            right: '(real value $0)',
            color: '#322525',
            size: 14
          }
        } else if (val > 0 && val <= 10) {
          this.example = {
            left: 'The sender didn\'t spare',
            center: '$'+val,
            right: 'for you',
            color: '#c2ff7b',
            size: 16
          }
        } else if (val > 10 && val <= 50) {
          this.example = {
            left: 'This is a really worthwhile',
            center: '$'+val,
            right: 'gift',
            color: '#673ab7',
            size: 20
          }
        } else if (val > 50 && val <= 100) {
          this.example = {
            left: 'Such a cool big gift for',
            center: '$'+val,
            right: '',
            color: '#ff5722',
            size: 24
          }
        } else if (val > 100 && val <= 2000) {
          this.example = {
            left: 'WOW! WOW! WOW! It\'s too expensive a gift for',
            center: '$'+val,
            right: '!',
            color: '#ffeb3b',
            size: 28
          }
        }  else if (val > 2000) {
          this.example = {
            left: 'It is impossible that the cost of',
            center: '$'+val,
            right: 'is real',
            color: '#58ecff',
            size: 32
          }
        }
      } else if (!this.exact) {
        if (val === 0) {
          this.example = {
            left: 'Price is not as important as attention',
            center: '',
            right: '',
            color: '#322525',
            size: 14
          }
        } else if (val > 0 && val <= 10) {
          this.example = {
            left: 'Seems like a',
            center: 'cool',
            right: 'stuff for the money',
            color: '#c2ff7b',
            size: 16
          }
        } else if (val > 10 && val <= 50) {
          this.example = {
            left: 'Wow, this is pretty',
            center: 'pricey',
            right: 'stuff',
            color: '#673ab7',
            size: 20
          }
        } else if (val > 50 && val <= 100) {
          this.example = {
            left: 'Wait, it\'s really',
            center: 'expensive',
            right: 'stuff',
            color: '#ff5722',
            size: 24
          }
        } else if (val > 100 && val <= 2000) {
          this.example = {
            left: 'Unbelievable, the cost of this gift is',
            center: 'too',
            right: 'high',
            color: '#ffeb3b',
            size: 28
          }
        }  else if (val > 2000) {
          this.example = {
            left: 'I don\'t have enough words to describe how precious',
            center: 'precious',
            right: 'this gift is',
            color: '#58ecff',
            size: 32
          }
        }
      }
    } else {
      this.example = {
        left: 'Price information was',
        center: 'abducted',
        right: 'by aliens',
        color: '#f44336',
        size: 20
      }
    }
  }

  inputBucks(e: Event) {
    const el = e.target as HTMLInputElement
    let val = parseFloat(el.value)
    this.cost = val
    this.setExample()
  }

  ngOnInit(): void {
    if (this.shown) {
      this.show()
    } else {
      this.hide()
    }
  }

  ngOnChanges(): void {
    if (this.shown) {
      this.show()
    } else {
      this.hide()
    }
  }

}
