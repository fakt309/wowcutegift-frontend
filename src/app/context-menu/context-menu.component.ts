import { Component, OnInit, Input, Output, EventEmitter, HostBinding, ElementRef } from '@angular/core';
import { AsyncService } from '../async.service'

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {

  constructor(private host: ElementRef) { }

  json: any = JSON

  @Input('show') show: boolean = false
  @Input('options') options: Array<Option> = []
  @Input('x') x: number = 0
  @Input('y') y: number = 0
  @Output() choose = new EventEmitter<string>()

  @HostBinding('style.left') bleft = this.x+'px'
  @HostBinding('style.top') btop = this.y+'px'
  @HostBinding('style.display') bdisplay = 'none'
  @HostBinding('style.opacity') bopcity = '0'
  @HostBinding('style.transform') btransform = `translateY(-20px)`

  async makeShow(): Promise<void> {
    this.bdisplay = 'flex'
    await AsyncService.delay(10)
    this.bopcity = '1'
    this.btransform = `translateY(0px)`
    await AsyncService.delay(300)
    return new Promise(res => res())
  }

  async makeHide(): Promise<void> {
    this.bopcity = '0'
    this.btransform = `translateY(-20px)`
    await AsyncService.delay(300)
    this.bdisplay = 'none'
    await AsyncService.delay(10)
    return new Promise(res => res())
  }

  clickOption(value: string) {
    this.show = false
    this.ngOnChanges()
    this.choose.emit(value)
  }

  correct(): void {
    const width = 140
    const height = 60*this.options.length
    if (this.x+width > window.innerWidth) {
      this.bleft = window.innerWidth-width+'px'
    }
    if (this.x < 0) {
      this.bleft = 0+'px'
    }
    if (this.y+height > window.innerHeight) {
      this.btop = window.innerHeight-height+'px'
    }
    if (this.y < 0) {
      this.btop = 0+'px'
    }
  }

  ngOnInit(): void {
    window.addEventListener('mousedown', (e: any) => {
      if (this.show && e.target.classList[0] != 'option' && e.target.classList[0] != 'ico' && e.target.classList[0] != 'text') {
        this.clickOption('')
      }
    })
    window.addEventListener('touchstart', (e: any) => {
      if (this.show && e.target.classList[0] != 'option' && e.target.classList[0] != 'ico' && e.target.classList[0] != 'text') {
        this.clickOption('')
      }
    })
  }

  ngOnChanges(): void {
    this.bleft = this.x+'px'
    this.btop = this.y+'px'
    this.correct()
    if (this.show) {
      this.makeShow()
    } else {
      this.makeHide()
    }
  }

}
export interface Option {
  title: string;
  img: string;
  value: string;
}
