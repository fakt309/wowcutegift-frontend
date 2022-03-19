import { Component, OnInit, HostBinding, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  constructor() { }

  @Input('show') show: boolean = false
  @HostBinding('style.display') display: string = 'none'

  ngOnInit(): void {
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
