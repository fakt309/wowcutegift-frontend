import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

  constructor() { }
  @Input('type') type: string = 'pen'
  isTouch: boolean = false
  url: string = '../../assets/pen.png'

  ngOnInit(): void {
    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  }

  ngOnChanges() {
    if (this.type == 'pen') {
      this.url = '../../assets/pen.png'
    } else if (this.type == 'eraser') {
      this.url = '../../assets/eraser.png'
    } else if (this.type == 'move') {
      this.url = '../../assets/moving.png'
    }
  }

}
