import { Component, OnInit, ElementRef, HostBinding } from '@angular/core';

@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
  styleUrls: ['./fullscreen.component.scss']
})
export class FullscreenComponent implements OnInit {

  constructor(private host: ElementRef) { }

  // @HostBinding('style.height') height: any = "100vh"
  el: any = this.host.nativeElement

  ngOnInit(): void {
    let isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (!isTouch) {
      this.el.querySelector('.wrapFullscreen').style.maxHeight = 'min(100%, 600px)'
    }
    // this.height = window.innerHeight+'px'
    // window.addEventListener('resize', () => {
    //   this.height = window.innerHeight+'px'
    // })
  }

}
