import { Component, OnInit, HostBinding, HostListener, ElementRef, Input, SimpleChanges, Output, EventEmitter } from '@angular/core'
import { AsyncService } from '../async.service';

@Component({
  selector: 'app-list-touch',
  templateUrl: './list-touch.component.html',
  styleUrls: ['./list-touch.component.scss']
})
export class ListTouchComponent implements OnInit {

  constructor(
    private host: ElementRef
  ) { }

  @Input('disable') disable: boolean = false
  @Input('backenable') backenable: boolean = false
  @Input('action') action: string = ''
  @HostBinding('style.display') display: string = 'none'
  @HostBinding('style.transform') transform: string = 'translate(0px)'
  @HostBinding('style.opacity') opacity: string = '1'
  @HostBinding('style.transition') transition: string = 'none'
  @Output() close = new EventEmitter<void>()

  scroll: any = {
    static: 0,
    dynamic: 0
  }
  disableback: boolean = false
  disablescroll: boolean = false
  touch: any = {
    start: [0, 0],
    prev: null,
    velocity: [0, 0],
    timeout: setTimeout(() => {}, 0),
    interrupt: false,
    pos: null,
    posinertia: null
  }

  refreshtranslate: number = -50
  refreshstatus: string = 'arrow'

  @HostListener('window:resize')
  onResize(): void {
    this.refresh()
  }

  @HostListener('touchstart', ['$event'])
  onTouchstart(e: any): void {
    if (this.disable) return
    if (!e.touches || e.touches.length != 1) return

    this.touch.start = [e.touches[0].clientX, e.touches[0].clientY]

    let margin = 30
    let bounding = this.host.nativeElement.querySelector('.content').getBoundingClientRect()

    this.touch.pos = 'none'
    if (bounding.height < window.innerHeight) {
      if (this.scroll.static < margin && this.scroll.static > -margin) {
        this.touch.pos = 'topborder'
      } else if (this.scroll.static < window.innerHeight-bounding.height+margin && this.scroll.static > window.innerHeight-bounding.height-margin) {
        this.touch.pos = 'bottomborder'
      } else if (this.scroll.static > window.innerHeight-bounding.height) {
        this.touch.pos = 'top'
      } else if (this.scroll.static < 0) {
        this.touch.pos = 'bottom'
      } else if (this.scroll.static < window.innerHeight-bounding.height && this.scroll.static > 0) {
        this.touch.pos = 'center'
      }
    } else if (bounding.height >= window.innerHeight) {
      if (this.scroll.static > -margin && this.scroll.static < margin) {
        this.touch.pos = 'topborder'
      } else if (bounding.height >= window.innerHeight && this.scroll.static < -bounding.height+window.innerHeight+margin && this.scroll.static > -bounding.height+window.innerHeight-margin) {
        this.touch.pos = 'bottomborder'
      } else if (this.scroll.static > 0) {
        this.touch.pos = 'top'
      } else if (this.scroll.static <= 0 && (bounding.height <= window.innerHeight || (this.scroll.static > -bounding.height+window.innerHeight))) {
        this.touch.pos = 'center'
      } else if (this.scroll.static < 0 && (this.scroll.static < -bounding.height+window.innerHeight)) {
        this.touch.pos = 'bottom'
      }
    }

    this.touch.interrupt = true
  }

  @HostListener('touchmove', ['$event'])
  onTouchmove(e: any): void {
    if (this.disable) return
    if (!e.touches || e.touches.length != 1) return

    let margin = 30
    let bounding = this.host.nativeElement.querySelector('.content').getBoundingClientRect()

    let x = e.touches[0].clientX-this.touch.start[0]
    let y = e.touches[0].clientY-this.touch.start[1]

    //backing-------------
    if (this.backenable && Math.abs(x) > Math.abs(y) && x > 0 && !this.disableback) {
      if (this.touch.prev != null) {
        this.touch.velocity = [e.touches[0].clientX-this.touch.prev[0], e.touches[0].clientY-this.touch.prev[1]]
      }
      this.disablescroll = true
      this.transform = `translateX(${x}px)`
      this.opacity = `${1-x/window.innerWidth}`
      this.touch.prev = [e.touches[0].clientX, e.touches[0].clientY]
      clearTimeout(this.touch.timeout)
      this.touch.timeout = setTimeout(() => {
        this.touch.velocity = [0, 0]
      }, 100)
      return
    }
    if (this.disablescroll) return

    this.disableback = true

    this.scroll.dynamic = e.touches[0].clientY-this.touch.start[1]

    if (this.touch.prev != null) {
      this.touch.velocity = [e.touches[0].clientX-this.touch.prev[0], e.touches[0].clientY-this.touch.prev[1]]

      if (bounding.height < window.innerHeight) {
        if (this.touch.pos == 'topborder') {
          if (this.touch.velocity[1] > 0) {
            this.touch.pos = 'center'
          } else if (this.touch.velocity[1] < 0) {
            this.touch.pos = 'bottom'
          }
        } else if (this.touch.pos == 'bottomborder') {
          if (this.touch.velocity[1] > 0) {
            this.touch.pos = 'top'
          } else if (this.touch.velocity[1] < 0) {
            this.touch.pos = 'center'
          }
        }
      } else if (bounding.height >= window.innerHeight) {
        if (this.touch.pos == 'topborder') {
          if (this.touch.velocity[1] > 0) {
            this.touch.pos = 'top'
          } else if (this.touch.velocity[1] < 0) {
            this.touch.pos = 'center'
          }
        } else if (this.touch.pos == 'bottomborder') {
          if (this.touch.velocity[1] > 0) {
            this.touch.pos = 'center'
          } else if (this.touch.velocity[1] < 0) {
            this.touch.pos = 'bottom'
          }
        }
      }

      clearTimeout(this.touch.timeout)
      this.touch.timeout = setTimeout(() => {
        this.touch.velocity = [0, 0]
      }, 100)

      if (this.scroll.static+this.scroll.dynamic > window.innerHeight-margin) {
        this.refreshtranslate = (this.scroll.static+this.scroll.dynamic)-(window.innerHeight-margin)-50
        if (this.refreshtranslate > 0) this.refreshtranslate = 0
      } else {
        this.refreshtranslate = -50
      }
      if (this.refreshtranslate == 0 && this.refreshstatus == 'arrow') {
        this.animateArrow(true)
        this.refreshstatus = 'refresh'
      } else if (this.refreshtranslate < 0 && this.refreshstatus == 'refresh') {
        this.animateArrow(false)
        this.refreshstatus = 'arrow'
      }
    }
    this.touch.prev = [e.touches[0].clientX, e.touches[0].clientY]
    this.checking()

    if (bounding.height < window.innerHeight) {
      if (this.touch.pos == 'top') {
        if (this.scroll.static+this.scroll.dynamic < window.innerHeight-bounding.height+margin) {
          this.scroll.dynamic = window.innerHeight-bounding.height-this.scroll.static
        }
      } else if (this.touch.pos == 'bottom') {
        if (this.scroll.static+this.scroll.dynamic > -margin) {
          this.scroll.dynamic = -this.scroll.static
        }
      } else if (this.touch.pos == 'center') {
        if (this.scroll.static+this.scroll.dynamic < margin) {
          this.scroll.dynamic = -this.scroll.static
        } else if (this.scroll.static+this.scroll.dynamic > window.innerHeight-bounding.height-margin) {
          this.scroll.dynamic = window.innerHeight-bounding.height-this.scroll.static
        }
      }
    } else if (bounding.height >= window.innerHeight) {
      if (this.touch.pos == 'top') {
        if (this.scroll.static+this.scroll.dynamic < margin) {
          this.scroll.dynamic = -this.scroll.static
        }
      } else if (this.touch.pos == 'bottom') {
        if (this.scroll.static+this.scroll.dynamic > window.innerHeight-bounding.height-margin) {
          this.scroll.dynamic = window.innerHeight-bounding.height-this.scroll.static
        }
      } else if (this.touch.pos == 'center') {
        if (this.scroll.static+this.scroll.dynamic > -margin) {
          this.scroll.dynamic = -this.scroll.static
        } else if (this.scroll.static+this.scroll.dynamic < window.innerHeight-bounding.height+margin) {
          this.scroll.dynamic = window.innerHeight-bounding.height-this.scroll.static
        }
      }
    }
  }

  @HostListener('touchend', ['$event'])
  onTouchend(e: any): void {
    if (this.disable) return
    if (!e.changedTouches || e.changedTouches.length != 1) return

    let x = e.changedTouches[0].clientX-this.touch.start[0]
    let y = e.changedTouches[0].clientY-this.touch.start[1]

    if (this.backenable && !this.disableback) {
      if (this.touch.velocity[0] != 0) {
        this.touch.interrupt = false
        this.inertia2(this.touch.velocity[0])
      } else {
        let opacity = parseFloat(this.opacity)
        if (opacity <= 0.5) {
          this.smoothHide()
        } else {
          this.smoothShow()
        }
      }
      return
    }

    let margin = 30
    let bounding = this.host.nativeElement.querySelector('.content').getBoundingClientRect()

    this.touch.start = [0, 0]

    this.scroll.static += this.scroll.dynamic
    this.scroll.dynamic = 0
    this.touch.prev = null
    this.touch.interrupt = false

    if (this.touch.pos == 'top' && this.touch.velocity[1] < 0 && this.scroll.static == 0) {
      this.touch.velocity[1] = 0
    } else if (this.touch.pos == 'center') {
      if (this.touch.velocity[1] > 0 && this.scroll.static == 0) {
        this.touch.velocity[1] = 0
      } else if (this.touch.velocity[1] < 0 && this.scroll.static == -bounding.height+window.innerHeight) {
        this.touch.velocity[1] = 0
      }
    } else if (this.touch.pos == 'bottom' && this.touch.velocity[1] > 0 && this.scroll.static == -bounding.height+window.innerHeight) {
      this.touch.velocity[1] = 0
    }

    if (this.touch.velocity[1] != 0) {
      this.inertia(this.touch.velocity[1])
    }

    if (this.scroll.static > window.innerHeight-margin) {
      if (this.refreshstatus == 'arrow') this.smoothScroll(window.innerHeight-margin)
    } else if (this.scroll.static < -bounding.height+margin) {
      this.smoothScroll(-bounding.height+margin)
    }

    if (this.refreshstatus == 'refresh') {
      this.animateRefresh()
      setTimeout(() => {
        location.reload()
      }, 10)
    } else {
      this.host.nativeElement.querySelector('.reload').style.transition = 'transform ease 0.3s'
      setTimeout(() => {
        this.refreshtranslate = -50
        setTimeout(() => {
          this.host.nativeElement.querySelector('.reload').style.removeProperty('transition')
        }, 300)
      }, 1)
    }

    this.disableback = false
    this.disablescroll = false
  }

  async smoothHide(): Promise<void> {
    this.transition = 'all ease 0.2s'
    await AsyncService.delay(10)
    this.transform = `translateX(${window.innerWidth}px)`
    this.opacity = `0`
    await AsyncService.delay(200)
    this.transition = 'none'
    this.display = 'none'
    this.disablescroll = false
    this.close.emit()
    return new Promise(res => res())
  }
  async smoothShow(): Promise<void> {
    if (this.display != 'flex') this.display = 'flex'
    await AsyncService.delay(10)
    this.transition = 'all ease 0.2s'
    await AsyncService.delay(10)
    this.transform = `translateX(0px)`
    this.opacity = `1`
    await AsyncService.delay(200)
    this.transition = 'none'
    this.disablescroll = false
    return new Promise((res) => {res()})
  }

  async inertia(v: number): Promise<any> {
    let damping = 1.04
    let pos: any = null
    let margin = 30
    let bounding = this.host.nativeElement.querySelector('.content').getBoundingClientRect()

    if (bounding.height < window.innerHeight) {
      if (this.scroll.static > window.innerHeight-bounding.height) {
        this.touch.posinertia = 'top'
      } else if (this.scroll.static < 0) {
        this.touch.posinertia = 'bottom'
      } else if (this.scroll.static < window.innerHeight-bounding.height && this.scroll.static > 0) {
        this.touch.posinertia = 'center'
      }
    } else if (bounding.height >= window.innerHeight) {
      if (this.scroll.static > 0) {
        this.touch.posinertia = 'top'
      } else if (this.scroll.static <= 0 && (bounding.height <= window.innerHeight || (this.scroll.static > -bounding.height+window.innerHeight))) {
        this.touch.posinertia = 'center'
      } else if (this.scroll.static < 0 && (this.scroll.static < -bounding.height+window.innerHeight)) {
        this.touch.posinertia = 'bottom'
      }
    }

    while (Math.abs(v) > 0.5) {
      if (bounding.height < window.innerHeight) {
        if (this.touch.posinertia == 'top') {
          if (this.scroll.static < window.innerHeight-bounding.height+margin) {
            this.scroll.static = window.innerHeight-bounding.height
            this.touch.interrupt = true
          }
        } else if (this.touch.posinertia == 'bottom') {
          if (this.scroll.static > -margin) {
            this.scroll.static = 0
            this.touch.interrupt = true
          }
        } else if (this.touch.posinertia == 'center') {
          if (this.scroll.static < margin) {
            this.scroll.static = 0
            this.touch.interrupt = true
          } else if (this.scroll.static > window.innerHeight-bounding.height-margin) {
            this.scroll.static = window.innerHeight-bounding.height
            this.touch.interrupt = true
          }
        }
      } else if (bounding.height >= window.innerHeight) {
        if (this.touch.posinertia == 'top') {
          if (this.scroll.static < margin) {
            this.scroll.static = 0
            this.touch.interrupt = true
          }
        } else if (this.touch.posinertia == 'bottom') {
          if (this.scroll.static > window.innerHeight-bounding.height-margin) {
            this.scroll.static = window.innerHeight-bounding.height
            this.touch.interrupt = true
          }
        } else if (this.touch.posinertia == 'center') {
          if (this.scroll.static > -margin) {
            this.scroll.static = 0
            this.touch.interrupt = true
          } else if (this.scroll.static < window.innerHeight-bounding.height+margin) {
            this.scroll.static = window.innerHeight-bounding.height
            this.touch.interrupt = true
          }
        }
      }

      if (this.touch.interrupt) {
        this.touch.interrupt = false
        return
      }
      await AsyncService.delay(20)
      this.scroll.static += v*1
      v = v/damping
      this.checking()
    }
  }

  async inertia2(v: number): Promise<any> {

    let damping = 1.15

    while (Math.abs(v) > 0.5) {
      if (this.touch.interrupt) {
        let opacity = parseFloat(this.opacity)
        if (opacity <= 0.5) {
          this.smoothHide()
        } else {
          this.smoothShow()
        }
        this.touch.interrupt = false
        return
      }
      await AsyncService.delay(20)
      if (this.transform.match(/translateX\(-?[0-9]*px\)/g) == null) {
        this.touch.interrupt = true
        continue
      }
      let translate = parseFloat(this.transform.match(/translateX\(-?[0-9]*px\)/g)![0].slice(11, -3))
      translate += v*40
      this.opacity = `${1-translate/window.innerWidth}`
      this.transform = `translateX(${translate}px)`
      v = v/damping
      if (translate >= window.innerWidth) {
        this.transform = `translateX(${window.innerWidth}px)`
        this.touch.interrupt = true
      }
      if (translate <= 0) {
        this.transform = `translateX(0px)`
        this.touch.interrupt = true
      }
    }
  }

  async smoothScroll(to: number): Promise<void> {
    this.host.nativeElement.querySelector('.content').style.transition = 'transform ease 0.3s'
    await AsyncService.delay(10)
    this.scroll.static = to
    this.scroll.dynamic = 0
    await AsyncService.delay(300)
    this.host.nativeElement.querySelector('.content').style.removeProperty('transition')
  }

  refresh(): void {

  }

  async checking(): Promise<void> {
    let margin = 30
    let bounding = this.host.nativeElement.querySelector('.content').getBoundingClientRect()
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

  async animateArrow(forward: boolean = true): Promise<void> {
    if (forward) {
      this.host.nativeElement.querySelector('.reload > .ico > path:nth-child(1) > animate:nth-child(1)').beginElement()
      this.host.nativeElement.querySelector('.reload > .ico > path:nth-child(2) > animate:nth-child(1)').beginElement()
      this.host.nativeElement.querySelector('.reload > .ico > path:nth-child(3) > animate:nth-child(1)').beginElement()
      await AsyncService.delay(100)
      this.host.nativeElement.querySelector('.reload > .ico').style.transform = 'rotate(360deg)'
    } else {
      this.host.nativeElement.querySelector('.reload > .ico').style.transform = 'rotate(0deg)'
      await AsyncService.delay(100)
      this.host.nativeElement.querySelector('.reload > .ico > path:nth-child(1) > animate:nth-child(2)').beginElement()
      this.host.nativeElement.querySelector('.reload > .ico > path:nth-child(2) > animate:nth-child(2)').beginElement()
      this.host.nativeElement.querySelector('.reload > .ico > path:nth-child(3) > animate:nth-child(2)').beginElement()
    }
  }

  async animateRefresh(): Promise<void> {
    this.host.nativeElement.querySelector('.reload > .ico').style.transition = 'transform linear 3s'
    await AsyncService.delay(10)
    this.host.nativeElement.querySelector('.reload > .ico').style.transform = 'rotate(3600deg)'
  }

  ngOnInit(): void {
    this.refresh()

    this.transform = `translateX(${window.innerWidth}px)`
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['action'] && changes['action'].previousValue != changes['action'].currentValue) {
      if (changes['action'].currentValue == 'show') {
        this.smoothShow()
      } else if (changes['action'].currentValue == 'hide') {
        this.smoothHide()
      }
    }
  }

}
