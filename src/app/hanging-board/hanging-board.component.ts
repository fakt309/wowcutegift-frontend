import { Component, OnInit, HostListener, HostBinding, Input, Output, EventEmitter } from '@angular/core'
import { AsyncService } from '../async.service'
import { TranslateComponent } from '../translate/translate.component'

@Component({
  selector: 'app-hanging-board',
  templateUrl: './hanging-board.component.html',
  styleUrls: ['./hanging-board.component.scss']
})
export class HangingBoardComponent implements OnInit {

  constructor(
    public trnl: TranslateComponent
  ) { }
  start: number = 0
  translateStatic: number = 0
  translateMove: number = 0
  exact: boolean = true
  example: any = {
    left: this.trnl.trnl(['The gift is', 'Подарок просто']),
    center: this.trnl.trnl(['priceless', 'бесценный']),
    right:  this.trnl.trnl(['(real value 0$)', '(реальная стоимость 0₽)']),
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

      let category: any = 0
      if (this.trnl.getlang() == 'en') {
        if (val === 0) {
          category = 0
        } else if (val > 0 && val <= 10) {
          category = 1
        } else if (val > 10 && val <= 100) {
          category = 2
        } else if (val > 100 && val <= 1000) {
          category = 3
        } else if (val > 1000 && val <= 3000) {
          category = 4
        } else if (val > 3000) {
          category = 5
        }
      } else if (this.trnl.getlang() == 'ru') {
        if (val === 0) {
          category = 0
        } else if (val > 0 && val <= 500) {
          category = 1
        } else if (val > 500 && val <= 3000) {
          category = 2
        } else if (val > 3000 && val <= 10000) {
          category = 3
        } else if (val > 10000 && val <= 50000) {
          category = 4
        } else if (val > 50000) {
          category = 5
        }
      }

      if (this.exact) {
        if (category == 0) {
          this.example = {
            left: this.trnl.trnl(['The gift is', 'Подарок просто']),
            center: this.trnl.trnl(['priceless', 'бесценный']),
            right: this.trnl.trnl(['(real value 0$)', '(реальная стоимость 0₽)']),
            color: '#322525',
            size: 14
          }
        } else if (category == 1) {
          this.example = {
            left: this.trnl.trnl(['The sender didn\'t spare', 'Отправитель не пожалел']),
            center: this.trnl.trnl(['$'+val, val+'₽']),
            right: this.trnl.trnl(['for you', 'для вас']),
            color: '#c2ff7b',
            size: 16
          }
        } else if (category == 2) {
          this.example = {
            left: this.trnl.trnl(['This is a really worthwhile', 'Это реально стоющий']),
            center: this.trnl.trnl(['$'+val, val+'₽']),
            right: this.trnl.trnl(['gift', 'подарок']),
            color: '#673ab7',
            size: 20
          }
        } else if (category == 3) {
          this.example = {
            left: this.trnl.trnl(['Such a cool big gift for', 'Очень хороший подарок за']),
            center: this.trnl.trnl(['$'+val, val+'₽']),
            right: '',
            color: '#ff5722',
            size: 24
          }
        } else if (category == 4) {
          this.example = {
            left: this.trnl.trnl(['WOW! WOW! WOW! It\'s too expensive a gift for', 'ВОУ! ВОУ! ВОУ! Это очень дорогой подарок за']),
            center: this.trnl.trnl(['$'+val, val+'₽']),
            right: '!',
            color: '#ffeb3b',
            size: 28
          }
        } else if (category == 5) {
          this.example = {
            left: this.trnl.trnl(['It is impossible that the cost of', 'Это невозможно, чтобы стоимость']),
            center: this.trnl.trnl(['$'+val, val+'₽']),
            right: this.trnl.trnl(['is real', 'была реальной']),
            color: '#58ecff',
            size: 32
          }
        }
      } else if (!this.exact) {
        if (category == 0) {
          this.example = {
            left: this.trnl.trnl(['Price is not as important as attention', 'Цена подарка не так важна как внимание']),
            center: '',
            right: '',
            color: '#322525',
            size: 14
          }
        } else if (category == 1) {
          this.example = {
            left: this.trnl.trnl(['Seems like a', 'Кажется это']),
            center: this.trnl.trnl(['cool', 'отличная']),
            right: this.trnl.trnl(['stuff for the money', 'вещь за свои деньги']),
            color: '#c2ff7b',
            size: 16
          }
        } else if (category == 2) {
          this.example = {
            left: this.trnl.trnl(['Wow, this is pretty', 'Воу, это довольно']),
            center: this.trnl.trnl(['pricey', 'дорогой']),
            right: this.trnl.trnl(['stuff', 'подарок']),
            color: '#673ab7',
            size: 20
          }
        } else if (category == 3) {
          this.example = {
            left: this.trnl.trnl(['Wait, it\'s really', 'Подождите, так это реально']),
            center: this.trnl.trnl(['expensive', 'дорогой']),
            right: this.trnl.trnl(['stuff', 'подарок']),
            color: '#ff5722',
            size: 24
          }
        } else if (category == 4) {
          this.example = {
            left: this.trnl.trnl(['Unbelievable, the cost of this gift is', 'Невероятно, стоимость данного подарко']),
            center: this.trnl.trnl(['too', 'слишком']),
            right: this.trnl.trnl(['high', 'высока']),
            color: '#ffeb3b',
            size: 28
          }
        }  else if (category == 5) {
          this.example = {
            left: this.trnl.trnl(['I don\'t have enough words to describe how precious', 'Я не могу подобрать слов, чтобы описать как']),
            center: this.trnl.trnl(['precious', 'драгоценен']),
            right: this.trnl.trnl(['this gift is', 'данный подарок']),
            color: '#58ecff',
            size: 32
          }
        }
      }
    } else {
      this.example = {
        left:  this.trnl.trnl(['Price information was', 'Информация о ценне подарка была']),
        center:  this.trnl.trnl(['abducted', 'похищенна']),
        right:  this.trnl.trnl(['by aliens', 'инопланетянами']),
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
