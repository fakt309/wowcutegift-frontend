import { Component, OnInit, Input, SimpleChanges, HostBinding, Output, EventEmitter } from '@angular/core'
import { AsyncService } from '../async.service'
import { TranslateComponent } from '../translate/translate.component'

@Component({
  selector: 'app-restore-window',
  templateUrl: './restore-window.component.html',
  styleUrls: ['./restore-window.component.scss']
})
export class RestoreWindowComponent implements OnInit {

  constructor(
    public trnl: TranslateComponent
  ) { }

  isTouch: boolean = false

  @HostBinding('class.animate') animate: boolean = false
  @HostBinding('style.display') display: string = 'none'
  @HostBinding('style.opacity') opacity: string = '0'
  @Input('show') show: boolean = false

  @Output() choose = new EventEmitter<string>()

  transform: string = 'translateY(-100vh)'

  async doShow(): Promise<void> {
    this.animate = true
    this.display = 'flex'
    await AsyncService.delay(10)
    this.opacity = '1'
    this.transform = 'translateY(0vh)'
    await AsyncService.delay(300)
    this.animate = false
    return new Promise(res => res())
  }

  async doHide(): Promise<void> {
    this.animate = true
    await AsyncService.delay(10)
    this.opacity = '0'
    this.transform = 'translateY(-100vh)'
    await AsyncService.delay(300)
    this.display = 'none'
    this.animate = false
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
