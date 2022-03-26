import { Component, OnInit, Input, SimpleChanges, HostBinding, HostListener, Output, EventEmitter } from '@angular/core'
import { AsyncService } from '../async.service'
import { TranslateComponent } from '../translate/translate.component'

@Component({
  selector: 'app-skip',
  templateUrl: './skip.component.html',
  styleUrls: ['./skip.component.scss']
})
export class SkipComponent implements OnInit {

  constructor(public trnl: TranslateComponent) { }

  isTouch: boolean = false
  touch: any = { hasbeenmove: false, timeout: setTimeout(() => {}, 0), holding: false }
  @Input('action') action: string = 'none'
  @Output() skip = new EventEmitter<void>()
  @HostBinding('style.display') display: string = 'none'
  @HostBinding('style.top') top: string = '-30vh'
  disablecontext: boolean = true

  @HostListener("window:contextmenu", ['$event'])
  onContextmenu(): any {
    if (this.disablecontext && this.isTouch) return false
  }

  @HostListener("window:touchstart", ['$event'])
  onTouchstart(e: any) {
    if (this.action != 'show') return
    if (this.isTouch && !e.touches) return
    if (!this.isTouch && e.touches) return

    clearTimeout(this.touch.timeout)
    this.touch.holding = true
    this.touch.timeout = setTimeout(() => {
      if (this.touch.holding && !this.touch.hasbeenmove) this.doSkip()
    }, 1000)
  }

  @HostListener("window:touchmove", ['$event'])
  onTouchmove(e: any) {
    if (this.action != 'show') return
    if (this.isTouch && !e.touches) return
    if (!this.isTouch && e.touches) return

    this.touch.hasbeenmove = true
  }

  @HostListener("window:touchend", ['$event'])
  onTouchend(e: any) {
    if (this.action != 'show') return
    if (this.isTouch && !e.touches) return
    if (!this.isTouch && e.touches) return

    this.touch.hasbeenmove = false
    this.touch.holding = false
  }

  @HostListener("window:keydown", ['$event'])
  onKeydown(e: any) {
    if (this.action != 'show') return
    if (e.code != "Escape") return

    this.doSkip()
  }

  doSkip(): void {
    this.skip.emit()
  }

  async show(): Promise<void> {
    this.display = 'flex'
    await AsyncService.delay(10)
    this.top = '0vh'
    await AsyncService.delay(300)
    return new Promise(res => res())
  }

  async hide(): Promise<void> {
    this.top = '-30vh'
    await AsyncService.delay(300)
    this.display = 'none'
    return new Promise(res => res())
  }

  ngOnInit(): void {
    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['action'] && changes['action'].previousValue != changes['action'].currentValue) {
      if (changes['action'].currentValue == 'show') {
        this.show()
        this.disablecontext = true
      } else if (changes['action'].currentValue == 'hide') {
        this.hide()
        setTimeout(() => {
          this.disablecontext = false
        }, 1000)
      }
    }
  }

}
