import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef, HostBinding } from '@angular/core';

import { AsyncService } from '../async.service'

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {

  constructor(private host: ElementRef) { }

  @Input('show') show: boolean = false
  @Input('color') color: string = "#000"
  @Output() chng = new EventEmitter<string>()

  @HostBinding('class.animate') animate: boolean = false
  @HostBinding('style.display') display: string = 'none'
  @HostBinding('style.opacity') opacity: string = '0'

  transform: string = `translateY(-100%)`

  startClose: number = 0

  // @HostListener('click', ['$event'])
  onClick(e: any): any {
    if (e.target.tagName == 'INPUT') return
    if (!this.isTouch && (e.target.classList[0] == 'close' || e.target.parentNode.classList[0] == 'close')) {
      this.show = false
      this.chng.emit(this.color)
      this.ngOnChanges()
      return
    }
    const input = this.host.nativeElement.querySelector('input[type="color"]')
    input.style.left = e.clientX+'px'
    input.style.top = e.clientY+'px'
    setTimeout(() => {
      input.click()
    }, 100);
  }

  @HostListener('touchstart', ['$event'])
  touchStart(e: any) {
    if (e.touches.length != 1) return
    this.startClose = e.touches[0].clientY
  }

  @HostListener('touchmove', ['$event'])
  touchMove(e: any) {
    if (e.touches.length != 1) return
    let delta = e.touches[0].clientY-this.startClose
    if (delta < -100) {
      this.show = false
      this.chng.emit(this.color)
      this.ngOnChanges()
    }
  }

  mode: string = "light"

  isTouch: boolean = true

  async makeShow(): Promise<void> {
    this.animate = true
    this.display = 'flex'
    await AsyncService.delay(10)
    this.opacity = '1'
    this.transform = `translateY(0%)`
    await AsyncService.delay(300)
    this.animate = false
    return new Promise(res => res())
  }

  async makeHide(): Promise<void> {
    this.animate = true
    await AsyncService.delay(10)
    this.opacity = '0'
    this.transform = `translateY(-100%)`
    await AsyncService.delay(300)
    this.display = 'none'
    this.animate = false
    return new Promise(res => res())
  }

  setMode(): void {
    let r, g, b, hsp
    let clr: any = this.color
    if (clr.match(/^rgb/)) {
      clr = clr.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/)
      r = clr[1]
      g = clr[2]
      b = clr[3]
    } else {
      clr = +("0x" + clr.slice(1).replace(clr.length < 5 && /./g, '$&$&'))
      r = clr >> 16
      g = clr >> 8 & 255
      b = clr & 255
    }
    hsp = Math.sqrt(0.299*(r*r)+0.587*(g*g)+0.114*(b*b))
    if (hsp > 127.5) {
      this.mode = 'dark'
    } else {
      this.mode = 'light'
    }
  }

  changeColor(e: any): void {
    this.color = e.target.value
    this.setMode()
  }

  ngOnInit(): void {
    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    this.setMode()
  }

  ngOnChanges(): void {
    this.setMode()
    if (this.show) {
      this.makeShow()
    } else if (!this.show) {
      this.makeHide()
    }
  }

}
