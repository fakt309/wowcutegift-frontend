import { Component, OnInit, HostListener } from '@angular/core'
import { Meta, MetaDefinition, Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'

import { CookieService } from 'ngx-cookie-service'
import { DatabaseService } from '../database.service'
import { AsyncService } from '../async.service'
import { TranslateComponent } from '../translate/translate.component'

import { DeviceInfoService } from '../device-info.service'
import { CryptoService } from '../crypto.service'
import { AnalyticService } from '../analytic.service'

@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.scss'],
  providers: [TranslateComponent]
})
export class GiftComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private databaseService: DatabaseService,
    private cookieService: CookieService,
    private deviceInfo: DeviceInfoService,
    private crypto: CryptoService,
    private meta: Meta,
    private title: Title,
    public trnl: TranslateComponent,
    private analytic: AnalyticService
  ) {}

  touch: any = {
    start: [0, 0],
    canmove: false,
    hasbeenmooved: false
  }

  @HostListener("window:contextmenu")
  contextmenu(): any {
    if (this.menu.archiveaction != 'show') {
      return false
    }
  }

  @HostListener("window:wheel", ['$event'])
  onWheel(e: any): void {
    if (!this.isTouch && this.menu.stage == 4 && this.activeGift != null) {
      if (this.activeGift?.type == "game" && this.activeGift.open) return
      let skeleton = this.getDivGift(this.activeGift)
      let rotate = skeleton.style.transform.match(/rotateY\(-?[0-9]+deg\)/) ? parseInt(skeleton.style.transform.match(/rotateY\(-?[0-9]+deg\)/)[0].slice(8, -4)) : 0
      rotate += (e.deltaY/Math.abs(e.deltaY))*20
      if (rotate > 360 || rotate < -360) {
        rotate = rotate%360
      }
      skeleton.style.transform = `translateX(0px) translateY(0px) translateZ(-1000px) rotateX(180deg) rotateY(${rotate}deg) rotateZ(0deg) scale(1)`
    }
  }

  @HostListener("window:touchstart", ['$event'])
  onTouchstart(e: any): void {
    if (this.isTouch && !e.touches) return
    if (!this.isTouch && e.touches) return
    if (e.touches.length != 1) return

    if (this.menu.archiveaction != 'show') {
      document.body.style.userSelect = 'none'
    }

    this.touch.start = [e.touches[0].clientX, e.touches[0].clientY]
    clearTimeout(this.timeoutDbl)
    clearTimeout(this.timeoutHolding)
    if (!this.menu.dbl && !this.menu.trpl) {
      this.touch.canmove = true
      this.menu.dbl = true
      this.menu.holding = true
      this.timeoutHolding = setTimeout(() => {
        if (this.menu.holding && this.touch.hasbeenmooved == false) {
          this.holding()
          this.menu.holding = false
        }
      }, 1000)
      this.timeoutDbl = setTimeout(() => {
        this.menu.dbl = false
        this.menu.trpl = false
      }, 200)
    } else if (this.menu.dbl && !this.menu.trpl) {
      this.touch.canmove = false
      this.menu.dbl = false
      this.menu.trpl = true
      this.timeoutDbl = setTimeout(() => {
        this.menu.trpl = false
        this.next()
      }, 200)
    } else if (this.menu.trpl) {
      this.menu.dbl = false
      this.menu.trpl = false
      this.triple()
    }
  }
  @HostListener("window:touchmove", ['$event'])
  onTouchmove(e: any): void {
    if (!this.touch.canmove) return

    this.touch.hasbeenmooved = true

    if (this.menu.stage != 0 && this.menu.stage < 4) {
      this.touch.hasbeenmooved = true
      this.box.animate = false

      let speed = 0.4
      let x = e.touches[0].clientX-this.touch.start[0]
      let rotate = this.box.oldrotate+x*speed
      if (rotate > 165+180) rotate = 165+180
      if (rotate < 165-180) rotate = 165-180
      this.box.transform = 'rotateX(-15deg) rotateY('+rotate+'deg)'
    } else if (this.menu.stage == 4 && this.activeGift == null && this.menu.archiveaction != 'show') {
      this.touch.hasbeenmooved = true

      let x = this.box.oldmove[0]+(e.touches[0].clientX-this.touch.start[0])
      let y = this.box.oldmove[1]+(e.touches[0].clientY-this.touch.start[1])
      if (x < -window.innerWidth/2-this.box.w/2-this.box.h-this.box.w+10) x = -window.innerWidth/2-this.box.w/2-this.box.h-this.box.w
      if (x > window.innerWidth/2+this.box.w/2+this.box.h-10) x = window.innerWidth/2+this.box.w/2+this.box.h
      if (y < -window.innerHeight/2-this.box.d/2-this.box.h+10) y = -window.innerHeight/2-this.box.d/2-this.box.h
      if (y > window.innerHeight/2+this.box.d/2+this.box.h-10) y = window.innerHeight/2+this.box.d/2+this.box.h
      this.box.transform = `translateX(${x}px) translateY(${y}px) rotateX(-90deg) rotateY(0deg)`
    } else if (this.isTouch && this.menu.stage == 4 && this.activeGift != null && this.menu.archiveaction != 'show') {
      this.touch.hasbeenmooved = true

      let skeleton: any = this.getDivGift(this.activeGift)
      if (skeleton == null) return

      let speed = 0.7
      let x = (e.touches[0].clientX-this.touch.start[0])*speed
      if (x > 360 || x < 360) x = x%360
      let y = e.touches[0].clientY-this.touch.start[1]

      if (this.activeGift.type == "game" && this.activeGift?.open) {
        x = 0
        this.skeleton.oldrotate = 0
      }

      if (y < -30) {
        if (y > 0) y = 0
        skeleton.style.transform = `translateX(0px) translateY(${-y}px) translateZ(-1000px) rotateX(180deg) rotateY(${(this.skeleton.oldrotate+x)}deg) scale(1)`
      } else {
        skeleton.style.transform = `translateX(0px) translateY(0px) translateZ(-1000px) rotateX(180deg) rotateY(${(this.skeleton.oldrotate+x)}deg) scale(1)`
      }
    }
  }
  @HostListener("window:touchend", ['$event'])
  onTouchend(e: any): void {
    this.touch.canmove = false
    document.body.style.userSelect = 'auto'

    if (this.touch.hasbeenmooved) {
      if (this.menu.stage != 0 && this.menu.stage < 4) {
        let speed = 0.4
        let x = e.changedTouches[0].clientX-this.touch.start[0]
        let rotate = this.box.oldrotate+x*speed
        if (rotate > 165+180) rotate = 165+180
        if (rotate < 165-180) rotate = 165-180
        this.box.oldrotate = rotate
      } else if (this.menu.stage == 4 && this.activeGift == null && this.menu.archiveaction != 'show') {
        this.box.oldmove[0] += e.changedTouches[0].clientX-this.touch.start[0]
        this.box.oldmove[1] += e.changedTouches[0].clientY-this.touch.start[1]
      } else if (this.isTouch && this.menu.stage == 4 && this.activeGift != null && this.menu.archiveaction != 'show') {
        let speed = 0.7
        let x = (e.changedTouches[0].clientX-this.touch.start[0])*speed
        if (x > 360 || x < 360) x = x%360
        let y = e.changedTouches[0].clientY-this.touch.start[1]
        if (y < -100) {
          this.hideGift(this.activeGift)
        } else {
          if (this.activeGift.type == "game" && this.activeGift?.open) {
            let skeleton: any = this.getDivGift(this.activeGift)
            skeleton.style.transform = `translateX(0px) translateY(0px) translateZ(-1000px) rotateX(180deg) rotateY(0deg) scale(1)`
          } else {
            let skeleton: any = this.getDivGift(this.activeGift)
            skeleton.style.transform = `translateX(0px) translateY(0px) translateZ(-1000px) rotateX(180deg) rotateY(${(this.skeleton.oldrotate+x)}deg) scale(1)`
            this.skeleton.oldrotate += x
            if (this.skeleton.oldrotate > 360 || this.skeleton.oldrotate < 360) this.skeleton.oldrotate = this.skeleton.oldrotate%360
          }

        }
      }
    }
    this.touch.hasbeenmooved = false
    this.skeleton.canmove = false
    this.menu.holding = false
  }
  @HostListener("window:keydown", ['$event'])
  onKeydown(e: any): void {
    if (e.code == "Space") this.next()
  }
  @HostListener("window:mousedown", ['$event'])
  onMousedown(e: any): void {
    if (this.isTouch && !e.touches) return
    if (!this.isTouch && e.touches) return

    this.touch.start = [e.clientX, e.clientY]
    this.touch.canmove = true
    if (this.menu.archiveaction != 'show') {
      document.body.style.userSelect = 'none'
    }
  }
  @HostListener("window:mousemove", ['$event'])
  onMousemove(e: any): void {
    if (!this.touch.canmove) return
    if (this.menu.stage != 0 && this.menu.stage < 4) {
      this.touch.hasbeenmooved = true
      this.box.animate = false

      let speed = 0.2
      let x = e.clientX-this.touch.start[0]
      let rotate = this.box.oldrotate+x*speed
      if (rotate > 165+180) rotate = 165+180
      if (rotate < 165-180) rotate = 165-180
      this.box.transform = 'rotateX(-15deg) rotateY('+rotate+'deg)'
    } else if (this.menu.stage == 4 && this.activeGift == null && this.menu.archiveaction != 'show') {
      this.touch.hasbeenmooved = true

      let x = this.box.oldmove[0]+(e.clientX-this.touch.start[0])
      let y = this.box.oldmove[1]+(e.clientY-this.touch.start[1])
      if (x < -window.innerWidth/2-this.box.w/2-this.box.h-this.box.w+10) x = -window.innerWidth/2-this.box.w/2-this.box.h-this.box.w
      if (x > window.innerWidth/2+this.box.w/2+this.box.h-10) x = window.innerWidth/2+this.box.w/2+this.box.h
      if (y < -window.innerHeight/2-this.box.d/2-this.box.h+10) y = -window.innerHeight/2-this.box.d/2-this.box.h
      if (y > window.innerHeight/2+this.box.d/2+this.box.h-10) y = window.innerHeight/2+this.box.d/2+this.box.h
      this.box.transform = `translateX(${x}px) translateY(${y}px) rotateX(-90deg) rotateY(0deg)`
    }
  }
  @HostListener("window:mouseup", ['$event'])
  onMouseup(e: any): void {
    if (!this.touch.canmove) return

    if (this.touch.hasbeenmooved) {
      if (this.menu.stage != 0 && this.menu.stage < 4) {
        let speed = 0.2
        let x = e.clientX-this.touch.start[0]
        let rotate = this.box.oldrotate+x*speed
        if (rotate > 165+180) rotate = 165+180
        if (rotate < 165-180) rotate = 165-180
        this.box.oldrotate = rotate
      } else if (this.menu.stage == 4) {
        this.box.oldmove[0] += e.clientX-this.touch.start[0]
        this.box.oldmove[1] += e.clientY-this.touch.start[1]
      }
    } else {
      this.next()
    }
    this.touch.hasbeenmooved = false
    this.touch.canmove = false
    document.body.style.userSelect = 'auto'
    this.skeleton.canmove = false
  }

  timeoutDbl: any = setTimeout(() => {}, 0)
  timeoutHolding: any = setTimeout(() => {}, 0)

  isTouch: boolean = true

  gifts: any = []

  activeGift: any = null

  showdemo: boolean = false
  showdemomenu: boolean = false

  data: any = {
    _id: "621dbcb6247c26ff35bf7b1b",
    gifts: [
      {
        id: 1,
        type: "greetingcard",
        title: "Greeting card",
        front: "../assets/greetingcard/front/1.jpg",
        back: "../assets/greetingcard/back/1.png",
        text: "May you be gifted with life’s biggest joys and never-ending bliss.<br>...",
        sign: "",
        colorText: "#000"
      }, {
        id: 2,
        type: "greetingcard",
        title: "Greeting card",
        front: "../assets/greetingcard/front/1.jpg",
        back: "../assets/greetingcard/back/1.png",
        text: "May you be gifted with life’s biggest joys and never-ending bliss.<br>...",
        sign: "",
        colorText: "#000"
      }, {
        id: 3,
        type: "game",
        title: "Game",
        platform: "playstation",
        color: "#006FCD",
        img: "../../assets/game/anygame.png",
        leftimg: "../../assets/game/psleft.png",
        wrap: "../../assets/game/ps.png",
        code: "DYR5-42KI-FR9G-POMN"
      }
    ],
    bucks: { value: 20,
      exact: false,
      exists: true },
    insidebox: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAGQCAYAAAByNR6YAAAAAXNSR0IArs4c6QAAGQBJREFUeF7t3Tmo7GcZx/EnFsZCA7FII6gREQQFlxQWgoql4loLFoJ2Kiiayli5BRdEULAQ7F2xUlxQCzGuEYTgrpWCSlSIEhdenYHJeCY3N/d5zpmZ3+eAIMm9z/k/n/e93C9nTubcVD4IECBAgAABAgRaBW5qnWYYAQIECBAgQIBACSyXgAABAgQIECDQLCCwmkGNI0CAAAECBAgILHeAAAECBAgQINAsILCaQY0jQIAAAQIECAgsd4AAAQIECBAg0CwgsJpBjSNAgAABAgQICCx3gAABAgQIECDQLCCwmkGNI0CAAAECBAgILHeAAAECBAgQINAsILCaQY0jQIAAAQIECAgsd4AAAQIECBAg0CwgsJpBjSNAgAABAgQICCx3gAABAgQIECDQLCCwmkGNI0CAAAECBAgILHeAAAECBAgQINAsILCaQY0jQIAAAQIECAgsd4AAAQIECBAg0CwgsJpBjSNAgAABAgQICCx3gAABAgQIECDQLCCwmkGNI0CAAAECBAgILHeAAAECBAgQINAsILCaQY0jQIAAAQIECAgsd4AAAQIECBAg0CwgsJpBjSNAgAABAgQICCx3gAABAgQIECDQLCCwmkGNI0CAAAECBAgILHeAAAECBAgQINAsILCaQY0jQIAAAQIECAgsd4AAAQIECBAg0CwgsJpBjSNAgAABAgQICCx3gAABAgQIECDQLCCwmkGNI0CAAAECBAgILHeAAAECBAgQINAsILCaQY0jQIAAAQIECAgsd4AAAQIECBAg0CwgsJpBjSNAgAABAgQICCx3gAABAgQIECDQLCCwmkGNI0CAAAECBAgILHeAAAECBAgQINAsILCaQY0jQIAAAQIECAgsd4AAAQIECBAg0CwgsJpBjSNAgAABAgQICCx3gAABAgQIECDQLCCwmkGNI0CAAAECBAgILHeAAAECBAgQINAsILCaQY0jQIAAAQIECAgsd4AAAQIECBAg0CwgsJpBjSNAgAABAgQICCx3gAABAgQIECDQLCCwmkGNI0CAAAECBAgILHeAAAECBAgQINAsILCaQY0jQIAAAQIECAgsd4AAAQIECBAg0CwgsJpBjSNAgAABAgQICCx3gAABAgQIECDQLCCwmkGNI0CAAAECBAgILHeAAAECBAgQINAsILCaQY0jQIAAAQIECAgsd4AAAQIECBAg0CwgsJpBjSNAgAABAgQICCx3gAABAgQIECDQLCCwmkGNI0CAAAECBAgILHeAAAECBAgQINAsILCaQY0jQIAAAQIECAgsd4AAAQIECBAg0CwgsJpBjSNAgAABAgQICCx3gAABAgQIECDQLCCwmkGNI0CAAAECBAgILHeAAAECBAgQINAsILCaQY0jQIAAAQIECAgsd4AAAQIECBAg0CwgsJpBjSNAgAABAgQICCx3gAABAgQIECDQLCCwmkGNI0CAAAECBAgILHeAAAECBAgQINAsILCaQY0jQIAAAQIECAgsd4AAAQIECBAg0CwgsJpBjSNAgAABAgQICCx3gAABAgQIECDQLCCwmkGNI0CAAAECBAgILHeAAAECBAgQINAsILCaQY0jQIAAAQIECAgsd4AAAQIECBAg0CwgsJpBjSNAgAABAgQICCx3gAABAgQIECDQLCCwmkGNI0CAAAECBAgILHeAAAECBAgQINAsILCaQY0jQIAAAQIECAgsd4AAAQIECBAg0CwgsJpBjSNAgAABAgQICCx3gAABAgQIECDQLCCwmkGNI0CAAAECBAgILHeAAAECBAgQINAsILCaQY0jQIAAAQIECAgsd4AAAQIECBAg0CwgsJpBjSNAgAABAgQICCx3gAABAgQIECDQLCCwmkGNI0CAAAECBAgILHeAAAECBAgQINAsILCaQY0jQIAAAQIECAgsd4AAAQIECBAg0CwgsJpBjSNAgAABAgQICCx3gAABAgQIECDQLCCwmkGNI0CAAAECBAgILHeAAAECBAgQINAsILCaQY0jQIAAAQIECAgsd4AAAQIECBAg0CwgsJpBjSNAgAABAgQICCx3gAABAgQIECDQLCCwmkGNI0CAAAECBAgILHeAAAECBAgQINAsILCaQY0jQIAAAQIECAgsd4AAAQIECBAg0CwgsJpBjSNAgAABAgQICCx3gAABAgQIECDQLCCwmkGNI0CAAAECBAgILHeAAAECBAgQINAsILCaQY0jQIAAAQIECAgsd4AAAQIECBAg0CwgsJpBjSNAgAABAgQICCx3gAABAgQIECDQLCCwmkGNI0CAAAECBAgILHeAAAECBAgQINAsILCaQY0jQIAAAQIECAgsd4AAAQIE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",
    giftsintobox: [
      {
       id: 3,
       w: 100,
       h: 140.74074074074073,
       x: -50,
       y: 29.629629629629633,
       z: -5.5,
       rotate: 0
      }, {
        id: 1,
        w: 80,
        h: 120,
        x: 60,
        y: -37.5,
        z: -1,
        rotate: 90
      }, {
        id: 2,
        w: 80,
        h: 120,
        x: -50,
        y: 29.629629629629633,
        z: -12,
        rotate: 0
      }
    ],
    package: "../../assets/box/package/4.jpg",
    tape: "../../assets/box/tape/13.jpg",
    createDate: new Date(),
    updateDate: new Date()
  }

  giftsintoarchive: any = []

  welcome: any = {
    stage: 1,
    cancontinue: false
  }
  menu: any = {
    stage: 0,
    dbl: false,
    trpl: false,
    holding: false,
    showarchive: false,
    archiveaction: 'hide'
  }
  box: any = {
    animate: false,
    packed: true,
    wrapped: true,
    tapped: true,
    transform: 'rotateX(-15deg) rotateY(165deg) scale(0)',
    oldrotate: 165,
    oldmove: [0, 0],
    w: 200,
    h: 100,
    d: 200
  }

  skeleton: any = {
    canmove: false,
    hasbeenmooved: false,
    animate: false,
    oldrotate: 0,
    opentextgame: 'Open'
  }

  menugift: string = 'none'

  holding(): void {
    if (this.menu.archiveaction != 'show' && this.showdemomenu) {
      this.router.navigate(['ready'], { queryParams: { lang: this.trnl.getlang() } })
    }
  }

  async next(): Promise<void> {
    if (this.welcome.stage == 1) {
      if (!this.welcome.cancontinue) return
      this.welcome.cancontinue = false
      this.welcome.stage++
      await AsyncService.delay(5000)
      this.welcome.cancontinue = true
    } else if (this.welcome.stage == 2) {
      if (!this.welcome.cancontinue) return
      this.welcome.cancontinue = false
      this.welcome.stage++
      this.box.animate = true
      await AsyncService.delay(2000)
      this.welcome.cancontinue = false
      this.box.transform = `rotateX(-15deg) rotateY(165deg) scale(1)`
      this.menu.stage = 1
      await AsyncService.delay(300)
    } else if (this.menu.stage > 0 && this.menu.stage < 4) {
      let stage = this.menu.stage
      this.menu.stage = 0
      if (stage == 1) {
        this.box.animate = true
        this.box.tapped = false
        await AsyncService.delay(6000)
        this.box.animate = false
      } else if (stage == 2) {
        this.box.animate = true
        this.box.wrapped = false
        await AsyncService.delay(5000)
        this.box.animate = false
      } else if (stage == 3) {
        this.box.animate = true
        this.box.packed = false
        await AsyncService.delay(600)
        this.box.transform = 'rotateX(-90deg) rotateY(0deg)'
        await AsyncService.delay(300)
        this.box.animate = false
        this.menu.showarchive = true
      }
      this.menu.stage += stage+1
    } else if (this.isTouch && this.menu.stage == 4 && this.activeGift?.type == "game") {
      this.openActiveGame()
    }
  }

  triple() {
    if (this.menu.stage == 4 && this.menu.archiveaction == 'hide' && this.isTouch)
    this.menu.archiveaction = 'show'
  }

  openActiveGame(): void {
    if (!this.activeGift.open || !this.activeGift.scratch) {
      this.activeGift.open = true
      this.activeGift.scratch = true
      let skeleton = this.getDivGift(this.activeGift)
      skeleton.style.transform = `translateX(0px) translateY(0px) translateZ(-1000px) rotateX(180deg) rotateY(0deg) rotateZ(0deg) scale(1)`
      this.skeleton.opentextgame = this.trnl.trnl(['Close', 'Закрыть'])
    } else {
      this.activeGift.open = !this.activeGift.open
      this.activeGift.scratch = !this.activeGift.scratch
      this.skeleton.opentextgame = this.trnl.trnl(['Open', 'Открыть'])
    }
  }

  processData(): void {
    let gifts: any = this.data.gifts
    let giftsintobox: any = this.data.giftsintobox

    this.gifts = []

    for (let i = 0; i < giftsintobox.length; i++) {
      for (let j = 0; j < gifts.length; j++) {
        if (gifts[j].id == giftsintobox[i].id) {
          this.gifts[i] = {...gifts[j], ...giftsintobox[i]}
          break
        }
      }
    }
  }

  startFocusSkeletonGift(e: any, id: number): void {
    if (this.isTouch && !e.touches) return
    if (!this.isTouch && e.touches) return
    this.skeleton.canmove = true

  }
  moveFocusSkeletonGift(e: any, id: number): void {
    if (!this.skeleton.canmove) return
    this.skeleton.hasbeenmooved = true
  }
  endFocusSkeletonGift(e: any, id: number): void {
    if (!this.skeleton.canmove) return

    if (!this.skeleton.hasbeenmooved) {
      if (this.menu.stage != 4) return
      if (this.activeGift != null) return
      let el = e.target
      while (el.classList[0] != 'skeletonGiftIntoBox') {
        if (el.tagName == 'BODY') return
        el = el.parentNode
      }
      let id = parseInt(el.getAttribute('idgift'))
      for (let i = 0; i < this.gifts.length; i++) {
        if (this.gifts[i].id == id) {
          this.menugift = this.gifts[i].type
          this.showGift(this.gifts[i])
          break
        }
      }
    }

    this.skeleton.hasbeenmooved = false
    this.skeleton.canmove = false
  }

  async actionMenuGift(act: string): Promise<void> {
    if (act == 'close') {
      this.hideGift(this.activeGift)
    } else if (act == 'opengame') {
      this.openActiveGame()
    }
  }

  getDivGift(gift: any): any {
    let skeletons: any = document.querySelectorAll('app-box2 .skeletonGiftIntoBox')
    for (let i = 0; i < skeletons.length; i++) {
      if (parseInt(skeletons[i].getAttribute('idgift')) == gift.id) {
        return skeletons[i]
        break
      }
    }
  }

  async showGift(gift: any) {
    this.skeleton.opentextgame = this.trnl.trnl(['Open', 'Открыть'])
    this.skeleton.oldrotate = 0
    this.box.animate = true
    await AsyncService.delay(10)
    this.box.transform = 'translateX(0px) translateY(0px) rotateX(-90deg) rotateY(0deg)'
    let skeletons: any = document.querySelectorAll('app-box2 .skeletonGiftIntoBox')
    let skeleton: any = null
    for (let i = 0; i < skeletons.length; i++) {
      if (parseInt(skeletons[i].getAttribute('idgift')) == gift.id) {
        skeleton = skeletons[i]
        break
      }
    }
    if (skeleton == null) return
    this.skeleton.animate = false
    let rotate: number = this.rotateGift(gift)
    this.activeGift = gift
    skeleton.style.opacity = `0`
    await AsyncService.delay(1)
    skeleton.style.transform = `translateX(${this.coordXGift(gift)}px) translateY(${this.coordYGift(gift)}px) translateZ(${this.coordZGift(gift)}px) rotateX(180deg) rotateY(0deg) rotateZ(${rotate}deg) scale(${gift.w/this.widthGift(gift)})`
    skeleton.style.opacity = `1`
    await AsyncService.delay(100)
    this.skeleton.animate = true
    await AsyncService.delay(10)
    skeleton.style.transform = `translateX(0px) translateY(0px) translateZ(-1000px) rotateX(180deg) rotateY(0deg) rotateZ(0deg) scale(1)`
    console.log(`translateX(0px) translateY(0px) translateZ(-1000px) rotateX(180deg) rotateY(0deg) rotateZ(0deg) scale(1)`)
    await AsyncService.delay(500)
    this.skeleton.animate = false
    this.box.animate = false
  }
  async hideGift(gift: any) {
    this.menugift = 'none'
    let skeleton: any = this.getDivGift(this.activeGift)
    if (skeleton == null) return
    this.skeleton.animate = true
    await AsyncService.delay(10)
    skeleton.style.transform = `translateX(${(window.innerWidth/2-80)}px) translateY(${(window.innerHeight/2-40)}px) translateZ(-1000px) rotateX(180deg) rotateY(0deg) rotateZ(0deg) scale(0)`
    await AsyncService.delay(500)
    this.skeleton.animate = false
    this.giftsintoarchive.push(this.activeGift)
    this.activeGift = null
    skeleton.remove()
    let div: any = document.querySelector('app-archive-button')
    div.style.animationName = 'earthshake'
    await AsyncService.delay(300)
    div.style.animationName = 'none'
  }

  widthGift(gift: any): number {

    if (this.activeGift?.id == gift.id) {
      let max = 800
      let percentage = 0.9
      if (window.innerWidth/window.innerHeight <= gift.w/gift.h) {
        let w = window.innerWidth*percentage
        if (w > max) w = max
        return w
      } else if (window.innerWidth/window.innerHeight > gift.w/gift.h) {
        let h = window.innerHeight*percentage
        if (h > max) h = max
        return h*(gift.w/gift.h)
      }
    }

    return gift.w
  }
  heightGift(gift: any): number {

    if (this.activeGift?.id == gift.id) {
      let max = 800
      let percentage = 0.9
      if (window.innerWidth/window.innerHeight <= gift.w/gift.h) {
        let w = window.innerWidth*percentage
        if (w > max) w = max
        return w/(gift.w/gift.h)
      } else if (window.innerWidth/window.innerHeight > gift.w/gift.h) {
        let h = window.innerHeight*percentage
        if (h > max) h = max
        return h
      }
    }

    return gift.h
  }
  coordXGift(gift: any): number {
    return gift.x ? gift.x : 0
  }
  coordYGift(gift: any): number {
    return gift.y ? gift.y : 0
  }
  coordZGift(gift: any): number {
    return gift.z ? gift.z : 0
  }
  rotateGift(gift: any): number {
    if (this.activeGift?.id == gift.id) {
      return 0
    }
    return gift.rotate ? gift.rotate : 0
  }

  setMeta(title: string, content: string): void {
    document.querySelector('meta[property="'+title+'"]')!.setAttribute("content", content)
  }

  addMeta(title: string, content: string): void {
    let meta = document.createElement('meta')
    meta.setAttribute('property', title)
    meta.content = content
    document.getElementsByTagName('head')[0].appendChild(meta)
  }

  ngOnInit(): void {
    // this.processData()

    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    setTimeout(() => { this.welcome.cancontinue = true }, 3000)

    let demonstration: any = false
    let demo: any = false
    let id: any = false
    this.route.queryParams.subscribe(params => {
      if (params['demonstration'] == '1') demonstration = true
      if (params['demo'] == '1') demo = true
      if (params['id']) id = params['id']
    })

    if (demonstration) {
      this.data = {
        _id: "621dbcb6247c26ff35bf7b1b",
        gifts: [
          {
            id: 1,
            type: "greetingcard",
            title: "Greeting card",
            front: "../assets/greetingcard/front/17.jpg",
            back: "../assets/greetingcard/back/5.png",
            text: "May your success double and joys triple, May your sadness halve and your troubles disappear!",
            sign: "../../assets/greetingcard/sign2.png",
            colorText: "#fff"
          }, {
            id: 2,
            type: "game",
            title: "Game",
            platform: "playstation",
            color: "#006FCD",
            img: "../../assets/game/example.jpg",
            leftimg: "../../assets/game/psleft.png",
            wrap: "../../assets/game/ps.png",
            code: "DYR5-42KI-FR9G-POMN"
          }
        ],
        bucks: { value: 20,
          exact: false,
          exists: true },
        insidebox: "",
        giftsintobox: [
          {
           id: 2,
           w: 100,
           h: 140,
           x: 0,
           y: 0,
           z: -(100/(135/15))/2,
           rotate: 0
          }, {
            id: 1,
            w: 80,
            h: 120,
            x: 0,
            y: 0,
            z: -(100/(135/15))-2,
            rotate: 0
          }
        ],
        package: "../../assets/box/package/11.jpg",
        tape: "../../assets/box/tape/10.jpg",
        createDate: new Date(),
        updateDate: new Date()
      }
      this.processData()
    } else if (demo) {
      this.showdemomenu = true
      this.showdemo = true
      if (this.cookieService.check('idbox')) {
        let query = {
          typequery: 'get',
          id: this.cookieService.get('idbox')
        }
        this.databaseService.setBox(query).subscribe((d: any) => {
          if (d.success) {
            let data: any = d.box

            let device = this.deviceInfo.getDeviceInfo()
            let demo = this.crypto.sha256(device.browser+device.browserMajorVersion+device.mobile+device.os+device.osVersion)

            if (demo == data.demo) {
              this.data = data
              this.processData()
            } else {
              this.router.navigate([''])
            }
          } else {
            this.router.navigate([''])
          }
        })
      } else {
        this.router.navigate([''])
      }
    } else if (id) {
      let query = {
        typequery: 'get',
        id: id
      }
      this.databaseService.setBox(query).subscribe((d: any) => {
        if (d.success) {
          let data: any = d.box
          if (data.demo == "") {
            this.data = data

            this.meta.updateTag({ property: 'og:url', content: window.location.href })
            this.meta.updateTag({ property: 'og:title', content: data.preview.title })
            this.meta.updateTag({ property: 'og:description', content: data.preview.descr })
            this.meta.updateTag({ property: 'og:image', content: data.preview.img })
            this.title.setTitle(data.preview.title)

            this.processData()

            // document.title = data.preview.title
            // this.addMeta('og:title', data.preview.title)
            // this.addMeta('og:description', data.preview.descr)
            // this.addMeta('og:image', data.preview.img)

          } else {
            this.router.navigate([''], { queryParams: { lang: this.trnl.getlang() } })
          }
        } else {
          this.router.navigate([''], { queryParams: { lang: this.trnl.getlang() } })
        }
      })
    } else {
      this.router.navigate([''], { queryParams: { lang: this.trnl.getlang() } })
    }

    this.analytic.visit()
  }

}

export interface Box {
  _id: string;
  gifts: Array<Object>;
  bucks: object;
  insidebox: string;
  giftsintobox: Array<Object>;
  package: string;
  tape: string;
  createDate: Date;
  updateDate: Date;
}
