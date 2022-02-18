import { Component, OnInit, Input, ElementRef, EventEmitter, Output, HostBinding } from '@angular/core';

import { AsyncService } from '../async.service'

@Component({
  selector: 'app-list-of-gifts',
  templateUrl: './list-of-gifts.component.html',
  styleUrls: ['./list-of-gifts.component.scss']
})
export class ListOfGiftsComponent implements OnInit {

  constructor(private host: ElementRef) { }

  @Input('arr') arr: Array<any> = []
  @Input('added') added: Array<any> = []
  @Input('show') show: boolean = false
  scrollist: number = 0

  isTouch: boolean = true
  @HostBinding('style.background-color') background: string = "#ffffff"

  @Output() close = new EventEmitter<void>()
  @Output() choose = new EventEmitter<any>()
  @Output() unchoose = new EventEmitter<any>()

  makeCross(e: any, ar: any): void {
    let el = e.target
    let i = 0
    while (1) {
      if (el.classList[0] == 'option' || i == 100) break
      el = el.parentNode
      i++
    }
    this.scrollist = this.host.nativeElement.getBoundingClientRect().height
    if (!el.classList.contains('crossed')) {
      this.choose.emit(ar)
    } else {
      this.unchoose.emit(ar)
    }

  }

  async toShow(): Promise<void> {
    this.host.nativeElement.style.display = 'flex'
    await AsyncService.delay(10)
    this.scrollist = this.host.nativeElement.getBoundingClientRect().height
    await AsyncService.delay(10)
    this.host.nativeElement.style.transform = 'translateY(0vh)'
    await AsyncService.delay(300)
    return new Promise(res => res())
  }

  async toHide(): Promise<void> {
    this.host.nativeElement.style.transform = 'translateY(150vh)'
    await AsyncService.delay(300)
    this.host.nativeElement.style.display = 'none'
    await AsyncService.delay(300)
    return new Promise(res => res())
  }

  refreshCross(): void {
    for (let i = 0; i < this.arr.length; i++) {
      let crossed = false
      for (let j = 0; j < this.added.length; j++) {
        if (this.added[j].id == this.arr[i].id) {
          crossed = true
          break
        }
      }
      this.arr[i].crossed = crossed
    }
  }

  ngOnInit(): void {
    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  }

  ngOnChanges(): void {
    if (this.show) {
      this.toShow()
    } else {
      this.toHide()
    }

    if (this.isTouch) {
      this.background = "#ffffff"
    } else {
      this.background = "#ffffff"
    }

    this.refreshCross()
  }

}
