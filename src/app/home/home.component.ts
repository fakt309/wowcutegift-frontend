import { Component, OnInit } from '@angular/core'
import { AsyncService } from '../async.service'
import { TranslateComponent } from '../translate/translate.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ TranslateComponent ]
})
export class HomeComponent implements OnInit {

  constructor(public trnl: TranslateComponent) { }

  isTouch: boolean = false
  menu: any = {
    actionskip: 'none',
    actionbuttons: 'none',
    screen: 1,
    gamezoom: true,
    greetingzoom: true,
    gameposition: 'right',
    greetingposition: 'right',
    greetingflip: false,
    allinto: false,
    animategifts: true,
    skipped: false
  }
  styles: any = {
    screen1: {
      display: 'none',
      opacity: '0',
      transformemoji: 'translateY(200px)',
      transformtext: 'translateX(-44px) translateY(-300px)'
    },
    screen2: {
      display: 'none',
      transformemoji: 'translateX(100vw) rotate(600deg)',
      transformtext: 'translateX(100vw) translateY(130px)'
    },
    screenlast: {
      display: 'none',
      transformemoji: 'scale(0)',
      transformtext: 'translateY(-130px) scale(0)'
    },
    box: {
      display: 'none',
      transform: 'translateX(200vw) translateY(0px) rotateX(-90deg) rotateY(0deg)'
    }
  }
  titlehint: string = ''
  greetingcard: any = {
    text: 'test',
    sign: ''
  }
  box: any = {
    animate: false,
    packed: false,
    wrapped: false,
    tapped: false,
  }
  chat: any = {
    message: 0,
    display: 'none',
    transform: 'translateX(100vw)'
  }

  async init(): Promise<void> {
    await AsyncService.delay(500)
    this.menu.actionskip = 'show'
    this.showFirstScreen()
    return new Promise(res => res())
  }

  skipWelcome(): void {
    this.menu.actioncontinue = 'hide'
    this.menu.skipped = true
    this.menu.actionskip = 'hide'
    this.menu.actionbuttons = 'show'
    this.box.animate = false
    this.box.packed = true
    this.box.wrapped = true
    this.box.tapped = true
    this.menu.allinto = true
    this.menu.gamezoom = false
    this.menu.greetingzoom = false
    this.styles.box.display = 'flex'
    this.styles.box.transform = 'translateX(0vw) translateY(0px) rotateX(-15deg) rotateY(15deg)'
    this.styles.screen1.display = 'none'
    this.styles.screen2.display = 'none'
    this.styles.screenlast.display = 'none'
    this.chat.display = 'none'
  }

  async continueWelcome(): Promise<void> {
    if (this.menu.screen == 1) {
      this.hideFirstScreen()
      await AsyncService.delay(300)
      this.showSecondScreen()
      this.menu.screen++
    } else if (this.menu.screen == 2) {
      this.hideSecondScreen()
      await AsyncService.delay(1000)
      this.showGame()
      this.menu.screen++
    } else if (this.menu.screen == 3) {
      this.showGreeting()
      this.menu.screen++
    } else if (this.menu.screen == 4) {
      this.flipGreeting()
      this.menu.screen++
    } else if (this.menu.screen == 5) {
      this.signGreeting()
      this.menu.screen++
    } else if (this.menu.screen == 6) {
      this.showBox()
      this.menu.screen++
    } else if (this.menu.screen == 7) {
      this.packageBox()
      this.menu.screen++
    } else if (this.menu.screen == 8) {
      this.showChat()
      this.menu.screen++
    } else if (this.menu.screen == 9) {
      this.showLastScreen()
      this.menu.screen++
    } else if (this.menu.screen == 10) {
      this.showOther()
      this.menu.screen++
    } else if (this.menu.screen == 11) {
      this.showFinale()
      this.menu.screen++
    }
  }

  async showFirstScreen(): Promise<void> {
    this.styles.screen1.display = 'flex'
    await AsyncService.delay(10)
    this.styles.screen1.opacity = '1'
    this.styles.screen1.transformemoji = 'translateY(0px)'
    this.styles.screen1.transformtext = 'translateX(-44px) translateY(-77px)'
    await AsyncService.delay(2000)
    if (!this.menu.skipped) this.menu.actioncontinue = 'show'
    await AsyncService.delay(300)
    return new Promise(res => res())
  }

  async hideFirstScreen(): Promise<void> {
    this.menu.actioncontinue = 'hide'
    this.styles.screen1.opacity = '0'
    await AsyncService.delay(300)
    this.styles.screen1.display = 'none'
    return new Promise(res => res())
  }

  async showSecondScreen(): Promise<void> {
    this.styles.screen2.display = 'flex'
    await AsyncService.delay(10)
    this.styles.screen2.transformemoji = 'translateX(0vw) rotate(0deg)'
    this.styles.screen2.transformtext = 'translateX(0vw) translateY(130px)'
    await AsyncService.delay(2000)
    if (!this.menu.skipped) this.menu.actioncontinue = 'show'
    await AsyncService.delay(300)
    return new Promise(res => res())
  }

  async hideSecondScreen(): Promise<void> {
    this.menu.actioncontinue = 'hide'
    if (this.isTouch) {
      this.styles.screen2.transformemoji = 'translateX(-300vw) rotate(-600deg)'
      this.styles.screen2.transformtext = 'translateX(-300vw) translateY(130px)'
    } else {
      this.styles.screen2.transformemoji = 'translateX(-100vw) rotate(-600deg)'
      this.styles.screen2.transformtext = 'translateX(-100vw) translateY(130px)'
    }
    await AsyncService.delay(500)
    this.styles.screen2.display = 'none'
    return new Promise(res => res())
  }

  async showGame(): Promise<void> {
    this.styles.box.display = 'flex'
    await AsyncService.delay(10)
    this.menu.gameposition = 'center'
    await AsyncService.delay(300)
    this.titlehint = this.trnl.trnl(["Buy the game", "Покупаем игру"])
    await AsyncService.delay(300)
    if (!this.menu.skipped) this.menu.actioncontinue = 'show'
    return new Promise(res => res())
  }

  async showGreeting(): Promise<void> {
    this.menu.actioncontinue = 'hide'
    this.titlehint = ""
    this.menu.gameposition = 'left'
    this.menu.greetingposition = 'center'
    this.menu.gamezoom = false
    await AsyncService.delay(500)
    this.titlehint = this.trnl.trnl(["Take a greeting card", "Берем открытку"])
    await AsyncService.delay(500)
    if (!this.menu.skipped) this.menu.actioncontinue = 'show'
    return new Promise(res => res())
  }

  async flipGreeting(): Promise<void> {
    this.greetingcard.text = " "
    this.menu.actioncontinue = 'hide'
    this.titlehint = ""
    this.menu.greetingflip = true
    await AsyncService.delay(600)
    this.titlehint =  this.trnl.trnl(["Write a text with wishes", "Пишем текст с нашими пожеланиями"])
    this.greetingcard.text = this.trnl.trnl(["May your success double and joys triple, May your sadness halve and your troubles disappear!", "Пусть будет все, что в жизни нужно,<br>Чем жизнь бывает хороша:<br>Любовь, здоровье, верность, дружба<br>И вечно юная душа."])
    await AsyncService.delay(500)
    if (!this.menu.skipped) this.menu.actioncontinue = 'show'
    return new Promise(res => res())
  }

  async signGreeting(): Promise<void> {
    this.menu.actioncontinue = 'hide'
    this.titlehint = ""
    await AsyncService.delay(500)
    this.titlehint = this.trnl.trnl(["Sign it by your hand", "Подписываем своей рукой"])
    this.greetingcard.sign = "../../assets/greetingcard/sign2.png"
    await AsyncService.delay(500)
    if (!this.menu.skipped) this.menu.actioncontinue = 'show'
    return new Promise(res => res())
  }

  async showBox(): Promise<void> {
    this.menu.actioncontinue = 'hide'
    this.titlehint = ""
    this.menu.greetingflip = false
    this.menu.greetingzoom = false
    this.menu.greetingposition = 'left'
    await AsyncService.delay(500)
    this.styles.box.transform = 'translateX(0vw) translateY(0px) rotateX(-90deg) rotateY(0deg)'
    this.menu.greetingposition = 'leftbox'
    this.menu.gameposition = 'leftbox'
    await AsyncService.delay(500)
    this.menu.greetingposition = 'into'
    this.menu.gameposition = 'into'
    await AsyncService.delay(500)
    this.menu.animategifts = false
    await AsyncService.delay(10)
    this.titlehint = this.trnl.trnl(["Put gifts into the box", "Складываем все в коробку"])
    await AsyncService.delay(500)
    this.menu.allinto = true
    if (!this.menu.skipped) this.menu.actioncontinue = 'show'
    return new Promise(res => res())
  }

  async packageBox(): Promise<void> {
    this.menu.actioncontinue = 'hide'
    this.titlehint = ""
    this.styles.box.transform = 'translateX(0vw) translateY(0px) rotateX(-15deg) rotateY(15deg)'
    this.box.animate = true
    await AsyncService.delay(300)
    this.box.packed = true
    await AsyncService.delay(1500)
    this.box.wrapped = true
    await AsyncService.delay(6100)
    this.box.tapped = true
    await AsyncService.delay(4000)
    this.titlehint = this.trnl.trnl(["Pack the box", "Упаковываем"])
    await AsyncService.delay(500)
    if (!this.menu.skipped) this.menu.actioncontinue = 'show'
    return new Promise(res => res())
  }

  async showChat(): Promise<void> {
    this.menu.actioncontinue = 'hide'
    this.titlehint = ""
    this.styles.box.transform = 'translateX(-200vw) translateY(0px) rotateX(-15deg) rotateY(15deg)'
    this.chat.display = 'flex'
    await AsyncService.delay(500)
    this.chat.transform = 'translateX(0vw)'
    await AsyncService.delay(1500)
    this.titlehint = this.trnl.trnl(["Send a link to the recipient", "Отправляем ссылку в чат"])
    this.chat.message = 1
    await AsyncService.delay(1500)
    this.chat.message = 2
    await AsyncService.delay(1500)
    this.chat.message = 3
    await AsyncService.delay(1500)
    if (!this.menu.skipped) this.menu.actioncontinue = 'show'
    return new Promise(res => res())
  }

  async showLastScreen(): Promise<void> {
    this.menu.actioncontinue = 'hide'
    this.titlehint = ""
    this.chat.transform = 'translateX(100vw)'
    this.styles.screenlast.display = "flex"
    await AsyncService.delay(300)
    this.styles.screenlast.transformemoji = "scale(1)"
    this.styles.screenlast.transformtext = "translateY(-130px) scale(1)"
    await AsyncService.delay(2000)
    if (!this.menu.skipped) this.menu.actioncontinue = 'show'
    return new Promise(res => res())
  }

  async showOther(): Promise<void> {
    this.menu.actioncontinue = 'hide'
    this.titlehint = this.trnl.trnl(["There are also many other options for decorating your gift.", "Также есть много других возможностей оформления вашего подарка"])
    await AsyncService.delay(300)
    this.styles.screenlast.transformemoji = "scale(0)"
    this.styles.screenlast.transformtext = "translateY(-130px) scale(0)"
    await AsyncService.delay(2000)
    if (!this.menu.skipped) this.menu.actioncontinue = 'show'
    await AsyncService.delay(1000)
    this.styles.screenlast.display = "none"
    return new Promise(res => res())
  }

  async showFinale(): Promise<void> {
    this.menu.actioncontinue = 'hide'
    this.titlehint = ""
    await AsyncService.delay(300)
    this.styles.box.transform = 'translateX(0vw) translateY(0px) rotateX(-15deg) rotateY(15deg)'
    await AsyncService.delay(300)
    this.menu.actionbuttons = 'show'
    this.menu.actionskip = 'hide'
    await AsyncService.delay(500)
    return new Promise(res => res())
  }

  get xGame(): string {
    if (this.menu.gameposition == 'right') {
      return '0vw'
    } else if (this.menu.gameposition == 'center') {
      return '-200vw'
    } else if (this.menu.gameposition == 'left') {
      return '-230vw'
    } else if (this.menu.gameposition == 'leftbox') {
      return '-30vw'
    } else if (this.menu.gameposition == 'into') {
      return '0vw'
    }
    return '0vw'
  }

  get yGame(): string {
    if (this.menu.gameposition == 'left') {
      return '100px'
    } else if (this.menu.gameposition == 'leftbox') {
      return '100px'
    }
    return '0px'
  }

  get xGreeting(): string {
    if (this.menu.greetingposition == 'right') {
      return '0vw'
    } else if (this.menu.greetingposition == 'center') {
      return '-200vw'
    } else if (this.menu.greetingposition == 'left') {
      return '-230vw'
    } else if (this.menu.greetingposition == 'leftbox') {
      return '-30vw'
    } else if (this.menu.greetingposition == 'into') {
      return '0vw'
    }
    return '0vw'
  }

  get yGreeting(): string {
    if (this.menu.greetingposition == 'left') {
      return '-100px'
    } else if (this.menu.greetingposition == 'leftbox') {
      return '-100px'
    }
    return '0px'
  }

  get rotateYGreeting(): number {
    if (this.menu.greetingflip) {
      return 180
    }
    return 0
  }

  get widthGreeting(): number {
    let maxw = 400
    let maxh = 400/(100/150)
    if (this.menu.allinto) {
      return 80
    } else if (100/150 >= window.innerWidth/window.innerHeight) {
      let width = 0.7*window.innerWidth
      if (width > maxw) width = maxw
      return width
    } else {
      let height = 0.7*window.innerHeight
      if (height > maxh) height = maxh
      return height*(100/150)
    }
    return 80
  }

  get heightGreeting(): number {
    let maxw = 400
    let maxh = 400/(100/150)
    if (this.menu.allinto) {
      return 120
    } else if (100/150 >= window.innerWidth/window.innerHeight) {
      let width = 0.7*window.innerWidth
      if (width > maxw) width = maxw
      return width/(100/150)
    } else {
      let height = 0.7*window.innerHeight
      if (height > maxh) height = maxh
      return height
    }
    return 120
  }

  get sizeGame(): number {
    let maxw = 400
    let maxh = 400/(135/190)
    if (this.menu.allinto) {
      return 100
    } else if (135/190 >= window.innerWidth/window.innerHeight) {
      let width = 0.7*window.innerWidth
      if (width > maxw) width = maxw
      return width
    } else {
      let height = 0.7*window.innerHeight
      if (height > maxh) height = maxh
      return height*(135/190)
    }
    return 100
  }

  get zGreeting(): number {
    if (!this.menu.allinto) {
      return -100
    }
    return -(100/(135/15))-2
  }

  get zGame(): number {
    if (!this.menu.allinto) {
      return -50
    }
    return -(100/(135/15))/2
  }

  get scaleGreeting(): number {
    if (this.menu.allinto) {
      return 1
    } else if (!this.menu.greetingzoom) {
      return 80/this.widthGreeting
    }
    return 1
  }

  get scaleGame(): number {
    if (this.menu.allinto) {
      return 1
    } else if (!this.menu.gamezoom) {
      return 100/this.sizeGame
    }
    return 1
  }

  testmethod(arg: string): string {
    return arg
  }

  ngOnInit(): void {
    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    this.init()
  }

}
