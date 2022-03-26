import { Component, OnInit, Input, HostBinding, SimpleChanges } from '@angular/core'
import { AsyncService } from '../async.service'
import { TranslateComponent } from '../translate/translate.component'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(public trnl: TranslateComponent) { }

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

      if (this.bucks.exact) {
        if (category == 0) {
          this.text = {
            left: this.trnl.trnl(['The gift is', 'Подарок просто']),
            center: this.trnl.trnl(['priceless', 'бесценный']),
            right: this.trnl.trnl(['(real value 0$)', '(реальная стоимость 0₽)']),
            color: '#322525',
            size: 14
          }
        } else if (category == 1) {
          this.text = {
            left: this.trnl.trnl(['The sender didn\'t spare', 'Отправитель не пожалел']),
            center: this.trnl.trnl(['$'+val, val+'₽']),
            right: this.trnl.trnl(['for you', 'для вас']),
            color: '#c2ff7b',
            size: 16
          }
        } else if (category == 2) {
          this.text = {
            left: this.trnl.trnl(['This is a really worthwhile', 'Это реально стоющий']),
            center: this.trnl.trnl(['$'+val, val+'₽']),
            right: this.trnl.trnl(['gift', 'подарок']),
            color: '#673ab7',
            size: 20
          }
        } else if (category == 3) {
          this.text = {
            left: this.trnl.trnl(['Such a cool big gift for', 'Очень хороший подарок за']),
            center: this.trnl.trnl(['$'+val, val+'₽']),
            right: '',
            color: '#ff5722',
            size: 24
          }
        } else if (category == 4) {
          this.text = {
            left: this.trnl.trnl(['WOW! WOW! WOW! It\'s too expensive a gift for', 'ВОУ! ВОУ! ВОУ! Это очень дорогой подарок за']),
            center: this.trnl.trnl(['$'+val, val+'₽']),
            right: '!',
            color: '#ffeb3b',
            size: 28
          }
        } else if (category == 5) {
          this.text = {
            left: this.trnl.trnl(['It is impossible that the cost of', 'Это невозможно, чтобы стоимость']),
            center: this.trnl.trnl(['$'+val, val+'₽']),
            right: this.trnl.trnl(['is real', 'была реальной']),
            color: '#58ecff',
            size: 32
          }
        }
      } else if (!this.bucks.exact) {
        if (category == 0) {
          this.text = {
            left: this.trnl.trnl(['Price is not as important as attention', 'Цена подарка не так важна как внимание']),
            center: '',
            right: '',
            color: '#322525',
            size: 14
          }
        } else if (category == 1) {
          this.text = {
            left: this.trnl.trnl(['Seems like a', 'Кажется это']),
            center: this.trnl.trnl(['cool', 'отличная']),
            right: this.trnl.trnl(['stuff for the money', 'вещь за свои деньги']),
            color: '#c2ff7b',
            size: 16
          }
        } else if (category == 2) {
          this.text = {
            left: this.trnl.trnl(['Wow, this is pretty', 'Воу, это довольно']),
            center: this.trnl.trnl(['pricey', 'дорогой']),
            right: this.trnl.trnl(['stuff', 'подарок']),
            color: '#673ab7',
            size: 20
          }
        } else if (category == 3) {
          this.text = {
            left: this.trnl.trnl(['Wait, it\'s really', 'Подождите, так это реально']),
            center: this.trnl.trnl(['expensive', 'дорогой']),
            right: this.trnl.trnl(['stuff', 'подарок']),
            color: '#ff5722',
            size: 24
          }
        } else if (category == 4) {
          this.text = {
            left: this.trnl.trnl(['Unbelievable, the cost of this gift is', 'Невероятно, стоимость данного подарко']),
            center: this.trnl.trnl(['too', 'слишком']),
            right: this.trnl.trnl(['high', 'высока']),
            color: '#ffeb3b',
            size: 28
          }
        }  else if (category == 5) {
          this.text = {
            left: this.trnl.trnl(['I don\'t have enough words to describe how precious', 'Я не могу подобрать слов, чтобы описать как']),
            center: this.trnl.trnl(['precious', 'драгоценен']),
            right: this.trnl.trnl(['this gift is', 'данный подарок']),
            color: '#58ecff',
            size: 32
          }
        }
      }
    } else {
      this.text = {
        left:  this.trnl.trnl(['Price information was', 'Информация о ценне подарка была']),
        center:  this.trnl.trnl(['abducted', 'похищенна']),
        right:  this.trnl.trnl(['by aliens', 'инопланетянами']),
        color: '#f44336',
        size: 20
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
