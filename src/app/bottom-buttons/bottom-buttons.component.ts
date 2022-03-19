import { Component, OnInit, Input, SimpleChanges } from '@angular/core'

import { AsyncService } from '../async.service'

@Component({
  selector: 'app-bottom-buttons',
  templateUrl: './bottom-buttons.component.html',
  styleUrls: ['./bottom-buttons.component.scss']
})
export class BottomButtonsComponent implements OnInit {

  constructor() { }

  @Input('stage') stage: number = 0

  isTouch: boolean = true

  style: any = [
    { display: 'none', transform: 'translateY(30vh)' },
    { display: 'none', transform: 'translateY(30vh)' },
    { display: 'none', transform: 'translateY(30vh)' },
    { display: 'none', transform: 'translateY(30vh)' }
  ]

  async setStage(stage: number): Promise<void> {
    for (let i = 0; i < this.style.length; i++) {
      if (this.style[i].display == 'flex') {
        this.style[i].transform = 'translateY(30vh)'
        await AsyncService.delay(300)
        this.style[i].display = 'none'
        break
      }
    }
    if (stage != 0) {
      this.style[stage-1].display = 'flex'
      await AsyncService.delay(300)
      this.style[stage-1].transform = 'translateY(0vh)'
    }
    return new Promise(res => res())
  }

  ngOnInit(): void {
    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stage'] && changes['stage'].previousValue != changes['stage'].currentValue) {
      this.setStage(changes['stage'].currentValue)
    }
  }

}
