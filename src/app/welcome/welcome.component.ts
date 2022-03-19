import { Component, OnInit, Input, HostBinding, SimpleChanges } from '@angular/core'

import { AsyncService } from '../async.service'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  @HostBinding('style.display') display: string = 'none'
  @HostBinding('style.opacity') opacity: string = '0'

  @Input('stage') stage: number = 0

  isTouch: boolean = false

  showhint: boolean = false

  style: any = [
    { animationLeft: '', animationRight: '', display: 'none', transformLeft: 'translateX(-200%) translateY(100%) skewY(-20deg)', transformRight: 'translateX(-193%) translateY(-101%) skewY(20deg)', opacity: '1' },
    { display: 'none', opacity: '0' }
  ]

  @Input('bucks') bucks: any = {
    value: 2002,
    exact: false,
    exists: true
  }

  text: any = {
    left: 'The gift is',
    center: 'priceless',
    right: '(real value $0)',
    color: '#322525',
    size: 5
  }

  async next(): Promise<void> {
    if (this.stage == 1) {
      this.showhint = false
      this.display = 'flex'
      this.style[0].display = 'flex'
      await AsyncService.delay(10)
      this.opacity = '1'
      await AsyncService.delay(300)
      this.style[0].animationLeft = 'movinginleft'
      this.style[0].animationRight = 'movinginright'
      await AsyncService.delay(2000)
      this.style[0].transformLeft = 'translateX(0%) translateY(0%) skewY(-20deg)'
      this.style[0].transformRight = 'translateX(-100%) translateY(-58.5%) skewY(20deg)'
      this.showhint = true
      await AsyncService.delay(300)
    } else if (this.stage == 2) {
      this.showhint = false
      this.style[0].animationLeft = 'movingoutleft'
      this.style[0].animationRight = 'movingoutright'
      await AsyncService.delay(2000)
      this.style[0].transformLeft = 'translateX(200%) translateY(-100%) skewY(-20deg)'
      this.style[0].transformRight = 'translateX(100%) translateY(100%) skewY(20deg)'
      await AsyncService.delay(2000)
      this.style[0].opacity = '0'
      await AsyncService.delay(300)
      this.style[0].display = 'none'
      this.style[1].display = 'flex'
      await AsyncService.delay(10)
      this.style[1].opacity = '1'
      await AsyncService.delay(300)
      this.showhint = true
      await AsyncService.delay(300)
    } else if (this.stage == 3) {
      this.showhint = false
      await AsyncService.delay(300)
      this.style[1].opacity = '0'
      await AsyncService.delay(300)
      this.style[1].display = 'none'
    }
  }

  setText(): void {
    let val = this.bucks.value
    if ((val || val === 0) && this.bucks.exists) {
      if (this.bucks.exact) {
        if (val === 0) {
          this.text = {
            left: 'The gift is',
            center: 'priceless',
            right: '(real value $0)',
            color: '#322525',
            size: 5
          }
        } else if (val > 0 && val <= 10) {
          this.text = {
            left: 'The sender didn\'t spare',
            center: '$'+val,
            right: 'for you',
            color: '#78dd02',
            size: 6
          }
        } else if (val > 10 && val <= 50) {
          this.text = {
            left: 'This is a really worthwhile',
            center: '$'+val,
            right: 'gift',
            color: '#673ab7',
            size: 7
          }
        } else if (val > 50 && val <= 100) {
          this.text = {
            left: 'Such a cool big gift for',
            center: '$'+val,
            right: '',
            color: '#ff5722',
            size: 8
          }
        } else if (val > 100 && val <= 2000) {
          this.text = {
            left: 'WOW! WOW! WOW! It\'s too expensive a gift for',
            center: '$'+val,
            right: '!',
            color: '#f1dc22',
            size: 9
          }
        }  else if (val > 2000) {
          this.text = {
            left: 'It is impossible that the cost of',
            center: '$'+val,
            right: 'is real',
            color: '#58ecff',
            size: 10
          }
        }
      } else if (!this.bucks.exact) {
        if (val === 0) {
          this.text = {
            left: 'Price is not as important as attention',
            center: '',
            right: '',
            color: '#322525',
            size: 5
          }
        } else if (val > 0 && val <= 10) {
          this.text = {
            left: 'Seems like a',
            center: 'cool',
            right: 'stuff for the money',
            color: '#78dd02',
            size: 6
          }
        } else if (val > 10 && val <= 50) {
          this.text = {
            left: 'Wow, this is pretty',
            center: 'pricey',
            right: 'stuff',
            color: '#673ab7',
            size: 7
          }
        } else if (val > 50 && val <= 100) {
          this.text = {
            left: 'Wait, it\'s really',
            center: 'expensive',
            right: 'stuff',
            color: '#ff5722',
            size: 8
          }
        } else if (val > 100 && val <= 2000) {
          this.text = {
            left: 'Unbelievable, the cost of this gift is',
            center: 'too',
            right: 'high',
            color: '#f1dc22',
            size: 9
          }
        }  else if (val > 2000) {
          this.text = {
            left: 'I don\'t have enough words to describe how precious',
            center: 'precious',
            right: 'this gift is',
            color: '#58ecff',
            size: 10
          }
        }
      }
    } else {
      this.text = {
        left: 'Price information was',
        center: 'abducted',
        right: 'by aliens',
        color: '#f44336',
        size: 8
      }
    }
  }

  ngOnInit(): void {
    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    this.setText()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bucks'] && changes['bucks'].previousValue != changes['bucks'].currentValue) {
      this.setText()
    }
    if (changes['stage'] && changes['stage'].previousValue != changes['stage'].currentValue) {
      this.next()
    }
  }

}
