import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, HostBinding } from '@angular/core'

import { AsyncService } from '../async.service'

@Component({
  selector: 'app-menu-gift',
  templateUrl: './menu-gift.component.html',
  styleUrls: ['./menu-gift.component.scss']
})
export class MenuGiftComponent implements OnInit {

  constructor() { }

  isTouch: boolean = false

  @HostBinding('style.display') display: string = 'none'
  @HostBinding('style.bottom') bottom: string = '-20vh'

  @Input('type') type: string = 'none'

  @Output() action = new EventEmitter<string>()

  showing: any = [false, false]

  @Input('opentextgame') opentextgame: string = 'Open'

  async doShow(): Promise<void> {
    for (let i = 0; i < this.showing.length; i++) { this.showing[i] = false }
    if (this.type == 'greetingcard') this.showing[0] = true
    if (this.type == 'game') this.showing[1] = true
    this.display = 'flex'
    await AsyncService.delay(10)
    this.bottom = '0vh'
    await AsyncService.delay(300)
    return new Promise(res => res())
  }

  async doHide(): Promise<void> {
    this.bottom = '-20vh'
    await AsyncService.delay(300)
    this.display = 'none'
    for (let i = 0; i < this.showing.length; i++) { this.showing[i] = false }
    return new Promise(res => res())
  }

  ngOnInit(): void {
    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type'] && changes['type'].previousValue != changes['type'].currentValue) {
      if (changes['type'].currentValue == 'none') {
        this.doHide()
      } else {
        this.doShow()
      }
    }
  }

}
