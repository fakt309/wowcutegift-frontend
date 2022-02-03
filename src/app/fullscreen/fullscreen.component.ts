import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
  styleUrls: ['./fullscreen.component.scss']
})
export class FullscreenComponent implements OnInit {

  constructor(private host: ElementRef) { }

  el: any = this.host.nativeElement

  ngOnInit(): void {
    let isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (!isTouch) {
      this.el.querySelector('.wrapFullscreen').style.maxHeight = '600px'
    }
  }

}
