import { Component, OnInit, HostBinding, Input, SimpleChanges } from '@angular/core'

import { AsyncService } from '../async.service'

@Component({
  selector: 'app-archive-button',
  templateUrl: './archive-button.component.html',
  styleUrls: ['./archive-button.component.scss']
})
export class ArchiveButtonComponent implements OnInit {

  constructor() { }

  isTouch: boolean = true

  @Input('show') show: boolean = false

  @HostBinding('class.desktop') desktop: boolean = false
  @HostBinding('style.display') display: string = 'none'
  @HostBinding('style.top') top: string = '-20vh'

  async doShow(): Promise<void> {
    this.display = 'flex'
    await AsyncService.delay(10)
    this.top = '10px'
    await AsyncService.delay(300)
    return new Promise(res => res())
  }

  async doHide(): Promise<void> {
    this.top = '-20vh'
    await AsyncService.delay(300)
    this.display = 'none'
    return new Promise(res => res())
  }

  ngOnInit(): void {
    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    if (!this.isTouch) {
      this.desktop = true
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['show'] && changes['show'].previousValue != changes['show'].currentValue) {
      if (changes['show'].currentValue) {
        this.doShow()
      } else {
        this.doHide()
      }
    }
  }

}
