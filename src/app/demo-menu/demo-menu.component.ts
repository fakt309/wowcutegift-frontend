import { Component, OnInit, HostBinding, Input, SimpleChanges } from '@angular/core'
import { Router } from '@angular/router'
import { TranslateComponent } from '../translate/translate.component'

@Component({
  selector: 'app-demo-menu',
  templateUrl: './demo-menu.component.html',
  styleUrls: ['./demo-menu.component.scss']
})
export class DemoMenuComponent implements OnInit {

  constructor(
    public router: Router,
    public trnl: TranslateComponent
  ) { }

  isTouch: boolean = false

  @HostBinding('style.display') display: string = 'none'
  @Input('show') show: boolean = false

  ngOnInit(): void {
    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['show'] && changes['show'].previousValue != changes['show'].currentValue) {
      if (changes['show'].currentValue) {
        this.display = 'flex'
      } else {
        this.display = 'none'
      }
    }
  }

}
