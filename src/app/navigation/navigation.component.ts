import { Component, OnInit, HostListener, Input, HostBinding, SimpleChanges, Output, EventEmitter } from '@angular/core'
import { AsyncService } from '../async.service'
import { TranslateComponent } from '../translate/translate.component'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(public trnl: TranslateComponent) { }

  @Output() choose = new EventEmitter<string>()

  @HostBinding("style.display") display: string = 'none'
  @HostBinding("style.opacity") opacity: string = '0'
  @HostBinding("style.transform") transform: string = 'translateX(0px) translateY(0px)'
  @HostBinding("class.animate") animate: boolean = false
  @HostBinding("class.unsee") unsee: boolean = true

  @Input('show') show: boolean = false
  @Input('bannext') bannext: string = ''

  isTouch: boolean = false

  touch: any = {
    start: null,
    end: null
  }

  howhide: string = ''

  @HostListener('touchstart', ['$event'])
  onStart(e: any): void {
    if (!this.isTouch || !e.touches) return
    if (e.touches.length != 1) return
    this.touch.start = [e.touches[0].clientX, e.touches[0].clientY]
  }

  @HostListener('touchend', ['$event'])
  onEnd(e: any): void {
    if (!this.isTouch || !e.changedTouches) return
    if (e.changedTouches.length != 1) return

    let x = e.changedTouches[0].clientX-this.touch.start[0]
    let y = e.changedTouches[0].clientY-this.touch.start[1]
    if (Math.abs(x) > -1*y) {
      if (x > 20) {
        this.howhide = 'back'
        this.choose.emit('back')
      } else if (x < -20 && this.bannext == '') {
        this.howhide = 'next'
        this.choose.emit('next')
      }
    } else {
      if (y < -20) {
        this.howhide = 'close'
        this.choose.emit('close')
      }
    }
    this.transform = `translateX(0px) translateY(0px)`
  }

  @HostListener('touchmove', ['$event'])
  onMove(e: any): void {
    if (!this.isTouch || !e.touches) return
    if (e.touches.length != 1) return

    let x = e.changedTouches[0].clientX-this.touch.start[0]
    let y = e.changedTouches[0].clientY-this.touch.start[1]
    if (Math.abs(x) > -1*y) {
      if (x < 0 && this.bannext != '') return
      this.transform = `translateX(${x}px) translateY(0px)`
    } else {
      this.transform = `translateX(0px) translateY(${y}px)`
    }
  }

  async doShow(): Promise<void> {
    this.animate = true
    this.display = 'flex'
    await AsyncService.delay(10)
    this.opacity = '1'
    await AsyncService.delay(400)
    this.unsee = false
    await AsyncService.delay(300)
    this.animate = false
    return new Promise(res => res())
  }

  async doHide(): Promise<void> {
    this.animate = true
    if (this.howhide == 'back') {
      this.transform = 'translateX(100%) translateY(0px)'
    } else if (this.howhide == 'next') {
      this.transform = 'translateX(-100%) translateY(0px)'
    } else if (this.howhide == 'close') {
      this.transform = 'translateX(0px) translateY(-100%)'
    }
    await AsyncService.delay(300)
    this.animate = false
    this.unsee = true
    this.opacity = '0'
    this.transform = 'translateX(0px) translateY(0px)'
    this.display = 'none'
    return new Promise(res => res())
  }

  ngOnInit(): void {
    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['show'] && changes['show'].previousValue != changes['show'].currentValue) {
      if (changes['show'].currentValue) {
        this.doShow()
      } else {
        this.doHide()
      }
    }
  }

}
