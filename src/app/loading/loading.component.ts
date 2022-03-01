import { Component, OnInit, Input, SimpleChanges, HostBinding } from '@angular/core'

import { AsyncService } from '../async.service'

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor() { }

  @Input('show') show: boolean = false

  @HostBinding('class.animate') animate: boolean = false
  @HostBinding('style.display') display: string = 'none'
  @HostBinding('style.opacity') opacity: string = '0'

  opacityico: string = '0'

  async doShow(): Promise<void> {
    this.animate = true
    this.display = 'flex'
    await AsyncService.delay(10)
    this.opacity = '1'
    await AsyncService.delay(300)
    this.opacityico = '1'
    await AsyncService.delay(300)
    this.animate = false
    return new Promise(res => res())
  }

  async doHide(): Promise<void> {
    this.animate = true
    await AsyncService.delay(10)
    this.opacityico = '0'
    await AsyncService.delay(300)
    this.opacity = '0'
    await AsyncService.delay(300)
    this.display = 'none'
    this.animate = false
    return new Promise(res => res())
  }

  ngOnInit(): void {
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
