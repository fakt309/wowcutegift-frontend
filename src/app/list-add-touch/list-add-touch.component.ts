import { Component, OnInit, HostListener, ElementRef, Input, SimpleChanges, Output, EventEmitter } from '@angular/core'
import { TranslateComponent } from '../translate/translate.component'
import { AsyncService } from '../async.service'

@Component({
  selector: 'app-list-add-touch',
  templateUrl: './list-add-touch.component.html',
  styleUrls: ['./list-add-touch.component.scss']
})
export class ListAddTouchComponent implements OnInit {

  constructor(
    public trnl: TranslateComponent,
    private host: ElementRef
  ) { }

  @Input('action') action: string = ''
  ripple: any = {
    w: 0,
    h: 0,
    processing: false,
    canclick: true
  }
  @Output() choose = new EventEmitter<string>()

  @HostListener('touchmove')
  ontouchmove(): void {
    this.ripple.canclick = false
  }

  async doripple(e: any): Promise<void> {
    if (!e.touches || e.touches.length != 1) return
    if (this.ripple.processing) return

    let el = e.target
    while (el.classList[0] != 'gift') {
      if (el.tagName == 'BODY') return
      el = el.parentNode
    }
    let bounding = el.getBoundingClientRect()
    let x = e.touches[0].clientX-bounding.left
    let y = e.touches[0].clientY-bounding.top
    this.ripple.processing = true
    el.querySelector(".wrapripple > .ripple").style.transform = `translateX(${x}px) translateY(${y}px) scale(0)`
    await AsyncService.delay(20)
    el.querySelector(".wrapripple > .ripple").style.transition = `all ease 0.3s`
    await AsyncService.delay(20)
    el.querySelector(".wrapripple > .ripple").style.transform = `translateX(${x-15}px) translateY(${y-15}px) scale(35)`
    await AsyncService.delay(300)
    el.querySelector(".wrapripple > .ripple").style.removeProperty('transition')
    this.ripple.processing = false
  }
  async undoripple(e: any, action: string): Promise<void> {

    let el = e.target
    while (el.classList[0] != 'gift') {
      if (el.tagName == 'BODY') return
      el = el.parentNode
    }

    await AsyncService.delay(200)

    el.querySelector(".wrapripple > .ripple").style.removeProperty('transition')
    el.querySelector(".wrapripple > .ripple").style.transform = `translateX(0px) translateY(0px) scale(0)`


    if (this.ripple.canclick) {
      this.action = 'hide'
      await AsyncService.delay(10)
      this.choose.emit(action)
    }

    this.ripple.canclick = true
  }

  async setwrapripple(): Promise<void> {
    await AsyncService.delay(10)
    let bounding = this.host.nativeElement.querySelector('app-list-touch > .content > .gift').getBoundingClientRect()
    this.ripple.w = bounding.width
    this.ripple.h = bounding.height
  }

  ngOnInit(): void {
    this.setwrapripple()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['action'] && changes['action'].previousValue != changes['action'].currentValue) {
      this.setwrapripple()
    }
  }

}
