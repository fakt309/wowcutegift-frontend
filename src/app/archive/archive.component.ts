import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, HostBinding, ElementRef, HostListener } from '@angular/core'
import { AsyncService } from '../async.service'
import { TranslateComponent } from '../translate/translate.component'

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  constructor(
    private host: ElementRef,
    public trnl: TranslateComponent
  ) { }

  @HostBinding('style.display') display: string = 'none'
  @HostBinding('style.top') top: string = '-100vh'

  @Input('actionin') actionin: string = ''
  @Output() actionout = new EventEmitter<string>()

  @Output() close = new EventEmitter<void>()

  @Input('gifts') gifts: any = []

  scroll: number = 0

  isTouch: boolean = false

  activeGift: any = null

  sizeDisplay: Array<number> = [0, 0]

  showhint: boolean =  true

  touch: any = {
    canmove: false,
    start: [0, 0],
    oldrotatedisplay: 0
  }

  module: string = 'display'

  @HostListener("window:resize")
  onResize(): void {
    this.setSizeDisplay()
  }


  startfocus(e: any): void {
    if (this.isTouch && !e.touches) return
    if (!this.isTouch && e.touches) return

    document.body.style.userSelect = 'none'

    this.touch.canmove = true
    if (this.isTouch) {
      this.touch.start = [e.touches[0].clientX, e.touches[0].clientY]
    } else {
      this.touch.start = [e.clientX, e.clientY]
    }
  }
  movefocus(e: any): void {
    if (!this.touch.canmove) return

    let x = 0
    if (this.isTouch) {
      x = e.touches[0].clientX-this.touch.start[0]
    } else {
      x = e.clientX-this.touch.start[0]
    }
    let rotate = this.touch.oldrotatedisplay+x
    if (rotate > 360 || rotate < 360) rotate = rotate%360
    this.host.nativeElement.querySelector(".display > *:nth-child(2)").style.transform = `rotateY(${(rotate)}deg)`

    if (this.showhint) this.showhint = false
  }
  endfocus(e: any): void {
    if (!this.touch.canmove) return

    document.body.style.userSelect = 'auto'

    let x = 0
    if (this.isTouch) {
      x = e.changedTouches[0].clientX-this.touch.start[0]
    } else {
      x = e.clientX-this.touch.start[0]
    }
    let rotate = this.touch.oldrotatedisplay+x
    if (rotate > 360 || rotate < 360) rotate = rotate%360
    this.touch.oldrotatedisplay = rotate

    this.touch.canmove = false
  }

  async show(): Promise<void> {
    this.display = 'flex'
    if (this.isTouch) {
      this.scroll = 0
      await AsyncService.delay(10)
      this.scroll = window.innerHeight
    }
    await AsyncService.delay(10)
    this.top = '0vh'
    await AsyncService.delay(300)
    this.actionout.emit('show')
    return new Promise(res => res())
  }

  async hide(): Promise<void> {
    this.top = '-100vh'
    await AsyncService.delay(300)
    this.display = 'none'
    this.actionout.emit('hide')
    return new Promise(res => res())
  }

  async addToBuffer(e: any, code: string): Promise<void> {
    navigator.clipboard.writeText(code)
    e.srcElement.style.animationName = "rotateAnim"
    await AsyncService.delay(500)
    e.srcElement.style.animationName = "none"
  }

  setSizeDisplay(): void {
    let bounding: any = this.host.nativeElement.querySelector('.content').getBoundingClientRect()
    let display: any = this.host.nativeElement.querySelector('.content .display')
    this.sizeDisplay = [bounding.width, bounding.height/2]
  }

  ngOnInit(): void {
    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['actionin'] && changes['actionin'].previousValue != changes['actionin'].currentValue) {
      if (changes['actionin'].currentValue == 'show') {
        this.show()
      } else if (changes['actionin'].currentValue == 'hide') {
        this.hide()
      }
    }
  }

}
