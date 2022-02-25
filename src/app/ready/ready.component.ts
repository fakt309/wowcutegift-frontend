import { Component, OnInit, SimpleChanges, Input, HostBinding, Output, EventEmitter } from '@angular/core';

import { AsyncService } from '../async.service'

@Component({
  selector: 'app-ready',
  templateUrl: './ready.component.html',
  styleUrls: ['./ready.component.scss']
})
export class ReadyComponent implements OnInit {

  constructor() { }

  @Input('show') show: boolean = false

  @Output() choose = new EventEmitter<string>()

  @HostBinding('class.animate') animate: boolean = false
  @HostBinding('style.display') display: string = 'none'
  @HostBinding('style.transform') transform: string = 'scale(0)'

  marginReady: string = '30vh'
  transformButtons: string = 'translateY(100vh)'
  animationNameReady: string = 'none'

  async doShow(): Promise<void> {
    this.animate = true
    this.display = 'flex'
    await AsyncService.delay(10)
    this.transform = 'scale(1)'
    await AsyncService.delay(300)
    this.animationNameReady = 'dance'
    await AsyncService.delay(1000)
    this.transformButtons = 'translateY(0vh)'
    this.marginReady = '0vh'
    await AsyncService.delay(300)
    this.animate = false
    return new Promise(res => res())
  }

  async doHide(): Promise<void> {
    this.animate = true
    await AsyncService.delay(10)
    this.transformButtons = 'translateY(0vh)'
    this.marginReady = '0vh'
    this.transform = 'scale(0)'
    await AsyncService.delay(300)
    this.display = 'none'
    this.animate = false
    return new Promise(res => res())
  }

  push(type: string):void {
    this.choose.emit(type)
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
