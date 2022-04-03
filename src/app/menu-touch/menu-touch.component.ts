import { Component, OnInit, HostListener, ElementRef, Input, SimpleChanges, Output, EventEmitter } from '@angular/core'
import { AsyncService } from '../async.service'

@Component({
  selector: 'app-menu-touch',
  templateUrl: './menu-touch.component.html',
  styleUrls: ['./menu-touch.component.scss']
})
export class MenuTouchComponent implements OnInit {

  constructor(
    private host: ElementRef
  ) { }

  @Input('options') options: any = []
  @Input('disable') disable: boolean = false
  @Output() choose = new EventEmitter<string>()
  @Output() open = new EventEmitter<boolean>()
  disable2: boolean = false
  hiding: boolean = false
  waschoosen: boolean = false
  ripple: any = {
    w: 0,
    h: 0,
    processing: false,
    canclick: true
  }
  scroll: any = {
    static: 0,
    dynamic: 0
  }
  right: number = 0
  background: any = {
    opacity: 0,
    display: 'flex',
    width: '0%',
    height: '0%'
  }
  menu: any = {
    status: 'close'
  }
  handle: any = {
    status: 'straight',
    color: '#e91e63',
    shadow: 'none'
  }
  touch: any = {
    start: [0, 0],
    prev: null,
    velocity: [0, 0],
    timeout: setTimeout(() => {}, 0),
    interrupt: false,
    pos: null,
    posinertia: null
  }
  touch2: any = {
    start: [0, 0],
    prev: null,
    velocity: [0, 0],
    timeout: setTimeout(() => {}, 0),
    interrupt: false,
    pos: null,
    posinertia: null
  }

  @HostListener('window:touchstart', ['$event'])
  ontouchstart(e: any): void {
    if (this.disable) return
    if (!e.touches || e.touches.length != 1) return

    this.touch.start = [e.touches[0].clientX, e.touches[0].clientY]

    this.touch.interrupt = true
  }

  @HostListener('window:touchmove', ['$event'])
  ontouchmove(e: any): void {
    if (this.hiding) return
    if (this.disable) return
    if (!e.touches || e.touches.length != 1) return

    let x = e.touches[0].clientX-this.touch2.start[0]
    let y = e.touches[0].clientY-this.touch2.start[1]
    if (Math.abs(x) >= Math.abs(y)) {
      this.disable2 = true
    }

    if (this.touch.prev != null) {
      this.touch.velocity = [e.touches[0].clientX-this.touch.prev[0], e.touches[0].clientY-this.touch.prev[1]]
    }
    clearTimeout(this.touch.timeout)
    this.touch.timeout = setTimeout(() => {
      this.touch.velocity = [0, 0]
    }, 100)

    if (this.touch.velocity[0] < 0 && (this.right > -Math.min(300, window.innerWidth)+30+30 && this.right < -30)) {
      this.handleanimation(true)
    } else {
      this.handleanimation(false)
    }

    let start = -Math.min(300, window.innerWidth)+30
    let r = 0
    if (this.menu.status == 'open') {
      r = -(e.touches[0].clientX-this.touch.start[0])
    } else if (this.menu.status == 'close') {
      r = start-(e.touches[0].clientX-this.touch.start[0])
    }
    // if (r < -Math.min(300, window.innerWidth)+30+30 && this.menu.status == 'close') r = -Math.min(300, window.innerWidth)+30
    // if (r > -30 && this.menu.status == 'open') r = 0
    if (r < start) r = start
    if (r > 0) r = 0

    if (r > -Math.min(300, window.innerWidth)+30) {
      // this.background.display = 'flex'
      this.background.width = '100%'
      this.background.height = '100%'
    } else {
      // this.background.display = 'none'
      this.background.width = '0%'
      this.background.height = '0%'
    }
    this.background.opacity = -(r-start)/start
    this.right = r

    this.touch.prev = [e.touches[0].clientX, e.touches[0].clientY]
  }

  @HostListener('window:touchend', ['$event'])
  ontouchend(e: any): void {
    if (this.hiding) return
    if (this.disable) return
    if (!e.changedTouches || e.changedTouches.length != 1) return

    this.disable2 = false

    this.touch.interrupt = false

    let start = -Math.min(300, window.innerWidth)+30

    if (this.handle.status == 'curve') this.handleanimation(false)

    if (this.touch.velocity[0] == 0 && !this.waschoosen) {
      if (this.right >= start/2) {
        this.smoothopen()
      } else {
        this.smoothclose()
      }
    } else {
      if (Math.abs(this.touch.velocity[0]) > Math.abs(this.touch.velocity[1])) {
        this.inertia(this.touch.velocity[0])
      }
    }
  }

  ontouchstartlist(e: any): void {
    if (this.disable2) return
    if (this.hiding) return
    if (!e.touches || e.touches.length != 1) return

    this.touch2.start = [e.touches[0].clientX, e.touches[0].clientY]

    let margin = 30
    let bounding = this.host.nativeElement.querySelector('.wrap > .content > .list').getBoundingClientRect()

    this.touch2.pos = 'none'
    if (bounding.height < window.innerHeight) {
      if (this.scroll.static < margin && this.scroll.static > -margin) {
        this.touch2.pos = 'topborder'
      } else if (this.scroll.static < window.innerHeight-bounding.height+margin && this.scroll.static > window.innerHeight-bounding.height-margin) {
        this.touch2.pos = 'bottomborder'
      } else if (this.scroll.static > window.innerHeight-bounding.height) {
        this.touch2.pos = 'top'
      } else if (this.scroll.static < 0) {
        this.touch2.pos = 'bottom'
      } else if (this.scroll.static < window.innerHeight-bounding.height && this.scroll.static > 0) {
        this.touch2.pos = 'center'
      }
    } else if (bounding.height >= window.innerHeight) {
      if (this.scroll.static > -margin && this.scroll.static < margin) {
        this.touch2.pos = 'topborder'
      } else if (bounding.height >= window.innerHeight && this.scroll.static < -bounding.height+window.innerHeight+margin && this.scroll.static > -bounding.height+window.innerHeight-margin) {
        this.touch2.pos = 'bottomborder'
      } else if (this.scroll.static > 0) {
        this.touch2.pos = 'top'
      } else if (this.scroll.static <= 0 && (bounding.height <= window.innerHeight || (this.scroll.static > -bounding.height+window.innerHeight))) {
        this.touch2.pos = 'center'
      } else if (this.scroll.static < 0 && (this.scroll.static < -bounding.height+window.innerHeight)) {
        this.touch2.pos = 'bottom'
      }
    }

    this.touch2.interrupt = true
  }
  ontouchmovelist(e: any): void {
    if (this.disable2) return
    if (!e.touches || e.touches.length != 1) return

    this.ripple.canclick = false

    let margin = 30
    let bounding = this.host.nativeElement.querySelector('.wrap > .content > .list').getBoundingClientRect()

    this.scroll.dynamic = e.touches[0].clientY-this.touch2.start[1]

    let x = e.touches[0].clientX-this.touch2.start[0]
    let y = e.touches[0].clientY-this.touch2.start[1]
    if (Math.abs(x) <= Math.abs(y)) {
      this.disable = true
    }

    if (this.touch2.prev != null) {
      this.touch2.velocity = [e.touches[0].clientX-this.touch2.prev[0], e.touches[0].clientY-this.touch2.prev[1]]

      if (bounding.height < window.innerHeight) {
        if (this.touch2.pos == 'topborder') {
          if (this.touch2.velocity[1] > 0) {
            this.touch2.pos = 'center'
          } else if (this.touch2.velocity[1] < 0) {
            this.touch2.pos = 'bottom'
          }
        } else if (this.touch2.pos == 'bottomborder') {
          if (this.touch2.velocity[1] > 0) {
            this.touch2.pos = 'top'
          } else if (this.touch2.velocity[1] < 0) {
            this.touch2.pos = 'center'
          }
        }
      } else if (bounding.height >= window.innerHeight) {
        if (this.touch2.pos == 'topborder') {
          if (this.touch2.velocity[1] > 0) {
            this.touch2.pos = 'top'
          } else if (this.touch2.velocity[1] < 0) {
            this.touch2.pos = 'center'
          }
        } else if (this.touch2.pos == 'bottomborder') {
          if (this.touch2.velocity[1] > 0) {
            this.touch2.pos = 'center'
          } else if (this.touch2.velocity[1] < 0) {
            this.touch2.pos = 'bottom'
          }
        }
      }
      clearTimeout(this.touch2.timeout)
      this.touch2.timeout = setTimeout(() => {
        this.touch2.velocity = [0, 0]
      }, 100)
    }
    this.touch2.prev = [e.touches[0].clientX, e.touches[0].clientY]
    this.checking2()

    if (bounding.height < window.innerHeight) {
      if (this.touch2.pos == 'top') {
        if (this.scroll.static+this.scroll.dynamic < window.innerHeight-bounding.height+margin) {
          this.scroll.dynamic = window.innerHeight-bounding.height-this.scroll.static
        }
      } else if (this.touch2.pos == 'bottom') {
        if (this.scroll.static+this.scroll.dynamic > -margin) {
          this.scroll.dynamic = -this.scroll.static
        }
      } else if (this.touch2.pos == 'center') {
        if (this.scroll.static+this.scroll.dynamic < margin) {
          this.scroll.dynamic = -this.scroll.static
        } else if (this.scroll.static+this.scroll.dynamic > window.innerHeight-bounding.height-margin) {
          this.scroll.dynamic = window.innerHeight-bounding.height-this.scroll.static
        }
      }
    } else if (bounding.height >= window.innerHeight) {
      if (this.touch2.pos == 'top') {
        if (this.scroll.static+this.scroll.dynamic < margin) {
          this.scroll.dynamic = -this.scroll.static
        }
      } else if (this.touch2.pos == 'bottom') {
        if (this.scroll.static+this.scroll.dynamic > window.innerHeight-bounding.height-margin) {
          this.scroll.dynamic = window.innerHeight-bounding.height-this.scroll.static
        }
      } else if (this.touch2.pos == 'center') {
        if (this.scroll.static+this.scroll.dynamic > -margin) {
          this.scroll.dynamic = -this.scroll.static
        } else if (this.scroll.static+this.scroll.dynamic < window.innerHeight-bounding.height+margin) {
          this.scroll.dynamic = window.innerHeight-bounding.height-this.scroll.static
        }
      }
    }
  }
  ontouchendlist(e: any): void {
    if (this.disable2) return
    if (!e.changedTouches || e.changedTouches.length != 1) return

    this.disable = false

    let margin = 30
    let bounding = this.host.nativeElement.querySelector('.wrap > .content > .list').getBoundingClientRect()

    this.touch2.start = [0, 0]

    this.scroll.static += this.scroll.dynamic
    this.scroll.dynamic = 0
    this.touch2.prev = null
    this.touch2.interrupt = false

    if (this.touch2.pos == 'top' && this.touch2.velocity[1] < 0 && this.scroll.static == 0) {
      this.touch2.velocity[1] = 0
    } else if (this.touch2.pos == 'center') {
      if (this.touch2.velocity[1] > 0 && this.scroll.static == 0) {
        this.touch2.velocity[1] = 0
      } else if (this.touch2.velocity[1] < 0 && this.scroll.static == -bounding.height+window.innerHeight) {
        this.touch2.velocity[1] = 0
      }
    } else if (this.touch2.pos == 'bottom' && this.touch2.velocity[1] > 0 && this.scroll.static == -bounding.height+window.innerHeight) {
      this.touch2.velocity[1] = 0
    }

    if (this.touch2.velocity[1] != 0) {
      this.inertia2(this.touch2.velocity[1])
    }

    if (this.scroll.static > window.innerHeight-margin) {
      this.smoothScroll(window.innerHeight-margin)
    } else if (this.scroll.static < -bounding.height+margin) {
      this.smoothScroll(-bounding.height+margin)
    }
  }

  async inertia2(v: number): Promise<any> {

    let damping = 1.04
    let pos: any = null
    let margin = 30
    let bounding = this.host.nativeElement.querySelector('.wrap > .content > .list').getBoundingClientRect()

    if (bounding.height < window.innerHeight) {
      if (this.scroll.static > window.innerHeight-bounding.height) {
        this.touch2.posinertia = 'top'
      } else if (this.scroll.static < 0) {
        this.touch2.posinertia = 'bottom'
      } else if (this.scroll.static < window.innerHeight-bounding.height && this.scroll.static > 0) {
        this.touch2.posinertia = 'center'
      }
    } else if (bounding.height >= window.innerHeight) {
      if (this.scroll.static > 0) {
        this.touch2.posinertia = 'top'
      } else if (this.scroll.static <= 0 && (bounding.height <= window.innerHeight || (this.scroll.static > -bounding.height+window.innerHeight))) {
        this.touch2.posinertia = 'center'
      } else if (this.scroll.static < 0 && (this.scroll.static < -bounding.height+window.innerHeight)) {
        this.touch2.posinertia = 'bottom'
      }
    }

    while (Math.abs(v) > 0.5) {
      if (bounding.height < window.innerHeight) {
        if (this.touch2.posinertia == 'top') {
          if (this.scroll.static < window.innerHeight-bounding.height+margin) {
            this.scroll.static = window.innerHeight-bounding.height
            this.touch2.interrupt = true
          }
        } else if (this.touch2.posinertia == 'bottom') {
          if (this.scroll.static > -margin) {
            this.scroll.static = 0
            this.touch2.interrupt = true
          }
        } else if (this.touch2.posinertia == 'center') {
          if (this.scroll.static < margin) {
            this.scroll.static = 0
            this.touch2.interrupt = true
          } else if (this.scroll.static > window.innerHeight-bounding.height-margin) {
            this.scroll.static = window.innerHeight-bounding.height
            this.touch2.interrupt = true
          }
        }
      } else if (bounding.height >= window.innerHeight) {
        if (this.touch2.posinertia == 'top') {
          if (this.scroll.static < margin) {
            this.scroll.static = 0
            this.touch2.interrupt = true
          }
        } else if (this.touch2.posinertia == 'bottom') {
          if (this.scroll.static > window.innerHeight-bounding.height-margin) {
            this.scroll.static = window.innerHeight-bounding.height
            this.touch2.interrupt = true
          }
        } else if (this.touch2.posinertia == 'center') {
          if (this.scroll.static > -margin) {
            this.scroll.static = 0
            this.touch2.interrupt = true
          } else if (this.scroll.static < window.innerHeight-bounding.height+margin) {
            this.scroll.static = window.innerHeight-bounding.height
            this.touch2.interrupt = true
          }
        }
      }

      if (this.touch2.interrupt) {
        this.touch2.interrupt = false
        return
      }
      await AsyncService.delay(20)
      this.scroll.static += v*1
      v = v/damping
      this.checking2()
    }
  }

  async checking(): Promise<void> {
    let margin = 30
    let bounding = this.host.nativeElement.querySelector('.wrap > .content > .list').getBoundingClientRect()
    if (this.scroll.static+this.scroll.dynamic > window.innerHeight-margin) {
      if (!this.touch.interrupt) {
        await AsyncService.delay(10)
        this.smoothScroll(window.innerHeight-margin)
        this.scroll.dynamic = 0
        this.touch.interrupt = true
        this.touch.velocity = [0, 0]
      }
    } else if (this.scroll.static+this.scroll.dynamic < -bounding.height+margin) {
      if (!this.touch.interrupt) {
        await AsyncService.delay(10)
        this.smoothScroll(-bounding.height+margin)
        this.scroll.dynamic = 0
        this.touch.interrupt = true
        this.touch.velocity = [0, 0]
      }
    }
  }

  async checking2(): Promise<void> {
    let margin = 60
    let bounding = this.host.nativeElement.querySelector('.wrap > .content > .list').getBoundingClientRect()
    if (this.scroll.static+this.scroll.dynamic > window.innerHeight-margin) {
      if (!this.touch2.interrupt) {
        await AsyncService.delay(10)
        this.smoothScroll(window.innerHeight-margin)
        this.scroll.dynamic = 0
        this.touch2.interrupt = true
        this.touch2.velocity = [0, 0]
      }
    } else if (this.scroll.static+this.scroll.dynamic < -bounding.height+margin) {
      if (!this.touch2.interrupt) {
        await AsyncService.delay(10)
        this.smoothScroll(-bounding.height+margin)
        this.scroll.dynamic = 0
        this.touch2.interrupt = true
        this.touch2.velocity = [0, 0]
      }
    }
  }

  async smoothScroll(to: number): Promise<void> {
    this.host.nativeElement.querySelector('.wrap > .content > .list').style.transition = 'transform ease 0.3s'
    await AsyncService.delay(10)
    this.scroll.static = to
    this.scroll.dynamic = 0
    await AsyncService.delay(300)
    this.host.nativeElement.querySelector('.wrap > .content > .list').style.removeProperty('transition')
  }

  async smoothopen(): Promise<void> {
    this.menu.status = 'open'
    this.host.nativeElement.querySelector('.background').style.transition = 'all ease 0.1s'
    this.host.nativeElement.querySelector('.wrap').style.transition = 'all ease 0.1s'
    // this.background.display = 'flex'
    this.background.width = '100%'
    this.background.height = '100%'
    await AsyncService.delay(10)
    this.background.opacity = 1
    this.right = 0
    this.handle.color = '#ffffff'
    this.handle.shadow = 'drop-shadow(0px 0px 2px #333)'
    await AsyncService.delay(100)
    this.host.nativeElement.querySelector('.background').style.removeProperty('transition')
    this.host.nativeElement.querySelector('.wrap').style.removeProperty('transition')
    this.open.emit(true)
  }
  async smoothclose(): Promise<void> {
    this.menu.status = 'close'
    this.host.nativeElement.querySelector('.background').style.transition = 'all ease 0.1s'
    this.host.nativeElement.querySelector('.wrap').style.transition = 'all ease 0.1s'
    await AsyncService.delay(10)
    this.background.opacity = 0
    this.right = -Math.min(300, window.innerWidth)+30
    await AsyncService.delay(100)
    // this.background.display = 'none'
    this.background.width = '0%'
    this.background.height = '0%'
    this.host.nativeElement.querySelector('.background').style.removeProperty('transition')
    this.host.nativeElement.querySelector('.wrap').style.removeProperty('transition')
    this.centerScroll()
    this.open.emit(false)
    return new Promise(res => res())
  }

  async inertia(v: number): Promise<any> {
    let damping = 1.15

    let start = -Math.min(300, window.innerWidth)+30

    while (Math.abs(v) > 0.5) {
      if (this.touch.interrupt) {
        this.touch.interrupt = false
        if (this.right >= start/2) {
          this.smoothopen()
        } else {
          this.smoothclose()
        }
        return
      }
      await AsyncService.delay(20)
      this.right += -v*40
      v = v/damping
      if (this.right > 0) {
        this.right = 0
        this.touch.interrupt = true
      }
      if (this.right < start) {
        this.right = start
        this.touch.interrupt = true
      }
    }

    if (this.right >= start/2) {
      this.smoothopen()
    } else {
      this.smoothclose()
    }
  }

  handleanimation(forward: boolean = true): void {
    if (forward  && this.handle.status == 'straight') {
      this.handle.status = 'curve'
      this.host.nativeElement.querySelector('.wrap > .handle > path:nth-child(1) > animate:nth-child(1)').beginElement()
    } else if (!forward && this.handle.status == 'curve') {
      this.handle.status = 'straight'
      this.host.nativeElement.querySelector('.wrap > .handle > path:nth-child(1) > animate:nth-child(2)').beginElement()
    }
  }

  async centerScroll(): Promise<void> {
    await AsyncService.delay(10)
    let bounding = this.host.nativeElement.querySelector('.wrap > .content').getBoundingClientRect()
    let boundinglist = this.host.nativeElement.querySelector('.wrap > .content > .list').getBoundingClientRect()
    if (boundinglist.height < bounding.height) {
      this.scroll.static = bounding.height/2-boundinglist.height/2
    } else {
      this.scroll.static = 0
    }
    this.scroll.dynamic = 0
  }

  async setwrapripple(): Promise<void> {
    await AsyncService.delay(10)
    let bounding = this.host.nativeElement.querySelector('.wrap > .content > .list > .option').getBoundingClientRect()
    this.ripple.w = bounding.width
    this.ripple.h = bounding.height
  }

  async doripple(e: any): Promise<void> {
    if (this.ripple.processing) return
    let el = e.target
    while (el.classList[0] != 'option') {
      if (el.tagName == 'BODY') return
      el = el.parentNode
    }
    let bounding = el.getBoundingClientRect()
    let x = e.touches[0].clientX-bounding.left
    let y = e.touches[0].clientY-bounding.top
    let endsize = [2*bounding.width, 2*bounding.width]
    this.ripple.processing = true
    el.querySelector(".wrapripple > .ripple").style.transform = `translateX(${x}px) translateY(${y}px) scale(0)`
    await AsyncService.delay(20)
    el.querySelector(".wrapripple > .ripple").style.transition = `all ease 0.5s`
    await AsyncService.delay(20)
    el.querySelector(".wrapripple > .ripple").style.transform = `translateX(${x-15}px) translateY(${y-15}px) scale(20)`
    await AsyncService.delay(500)
    el.querySelector(".wrapripple > .ripple").style.removeProperty('transition')
    this.ripple.processing = false
  }
  async undoripple(e: any, action: string): Promise<void> {

    let el = e.target
    while (el.classList[0] != 'option') {
      if (el.tagName == 'BODY') return
      el = el.parentNode
    }

    await AsyncService.delay(200)
    el.querySelector(".wrapripple > .ripple").style.removeProperty('transition')
    el.querySelector(".wrapripple > .ripple").style.transform = `translateX(0px) translateY(0px) scale(0)`
    // el.querySelector(".wrapripple > .ripple").style.width = `0px`
    // el.querySelector(".wrapripple > .ripple").style.height = `0px`

    if (this.ripple.canclick) {
      this.waschoosen = true
      await this.smoothclose()
      this.waschoosen = false
      this.choose.emit(action)
    }

    this.ripple.canclick = true
  }

  async renew(): Promise<void> {
    this.host.nativeElement.querySelector('.wrap > .handle').style.transition = 'all ease 0.1s'
    await AsyncService.delay(10)
    this.host.nativeElement.querySelector('.wrap > .handle').style.transform = 'translateY(-30px)'
    await AsyncService.delay(100)
    this.host.nativeElement.querySelector('.wrap > .handle').style.transform = 'translateY(30px)'
    this.handle.color = '#ffffff'
    this.handle.shadow = 'drop-shadow(0px 0px 2px #333)'
    await AsyncService.delay(100)
    this.host.nativeElement.querySelector('.wrap > .handle').style.transform = 'translateY(-30px)'
    await AsyncService.delay(100)
    this.host.nativeElement.querySelector('.wrap > .handle').style.transform = 'translateY(0px)'
    this.handle.color = '#e91e63'
    this.handle.shadow = 'none'
    await AsyncService.delay(100)
    this.host.nativeElement.querySelector('.wrap > .handle').style.removeProperty('transform')
    this.host.nativeElement.querySelector('.wrap > .handle').style.removeProperty('transition')
  }

  async demo(): Promise<void> {
    if (this.hiding) return
    this.host.nativeElement.querySelector('.wrap').style.transition = 'all ease 0.2s'
    this.right = -Math.min(300, window.innerWidth)+80
    this.handleanimation(true)
    await AsyncService.delay(200)
    this.right = -Math.min(300, window.innerWidth)+30
    this.handleanimation(false)
    await AsyncService.delay(200)
    this.host.nativeElement.querySelector('.wrap').style.removeProperty('transition')
  }

  async hide(): Promise<void> {
    this.host.nativeElement.querySelector('.wrap').style.transition = 'all ease 0.2s'
    await AsyncService.delay(10)
    this.right = -Math.min(300, window.innerWidth)
    await AsyncService.delay(200)
    this.host.nativeElement.querySelector('.wrap').style.removeProperty('transition')
  }

  async show(): Promise<void> {
    console.log('show')
    this.host.nativeElement.querySelector('.wrap').style.transition = 'all ease 0.2s'
    await AsyncService.delay(10)
    this.right = -Math.min(300, window.innerWidth)+30
    await AsyncService.delay(200)
    this.host.nativeElement.querySelector('.wrap').style.removeProperty('transition')
  }

  ngOnInit(): void {
    this.right = -Math.min(300, window.innerWidth)+30
    setTimeout(() => this.demo(), 10)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] && changes['options'].previousValue != changes['options'].currentValue) {
      if (changes['options'].currentValue[0]) {
        if (this.hiding) this.show()
        this.hiding = false
        this.centerScroll()
        this.renew()
        if (changes['options'].currentValue[0]) this.setwrapripple()
      } else {
        this.hiding = true
        this.hide()
      }
    }
  }

}
