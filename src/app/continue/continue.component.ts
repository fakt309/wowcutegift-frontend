import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, HostListener, HostBinding } from '@angular/core'
import { AsyncService } from '../async.service'

@Component({
  selector: 'app-continue',
  templateUrl: './continue.component.html',
  styleUrls: ['./continue.component.scss']
})
export class ContinueComponent implements OnInit {

  constructor() { }

  isTouch: boolean = false
  @Input('action') action: string = 'none'
  @Output() cntue = new EventEmitter<void>()
  @HostBinding("style.display") display: string = 'none'
  @HostBinding("style.opacity") opacity: string = '0'
  @HostBinding("style.transform") transform: string = 'translateY(-40px)'

  @HostListener("window:click")
  onClick(): void {
    if (this.action == "show") this.cntue.emit()
  }

  async show(): Promise<void> {
    this.display = 'flex'
    await AsyncService.delay(30)
    this.opacity = '1'
    this.transform = 'translateY(0px)'
    await AsyncService.delay(300)
    return new Promise(res => res())
  }

  async hide(): Promise<void> {
    this.opacity = '0'
    this.transform = 'translateY(-40px)'
    await AsyncService.delay(300)
    this.display = 'none'
    return new Promise(res => res())
  }

  ngOnInit(): void {
    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['action'] && changes['action'].previousValue != changes['action'].currentValue) {
      if (changes['action'].currentValue == "show") {
        this.show()
      } else if (changes['action'].currentValue == "hide") {
        this.hide()
      }
    }
  }

}
