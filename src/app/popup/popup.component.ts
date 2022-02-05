import { Component, OnInit, ElementRef, HostBinding } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  constructor(private host: ElementRef) { }
  el: any = this.host.nativeElement
  hideCoord: any = [0, 0]

  @HostBinding('class.animate') animate: boolean = false

  show(x?: number, y?: number) {
    this.el.style.display = 'flex'
    this.animate = true
    if ((x && y) || (x === 0 && y === 0)) {
      this.el.querySelector('.contentPopup').style.marginLeft = `${2*(x-window.innerWidth/2)}px`
      this.el.querySelector('.contentPopup').style.marginTop = `${2*(y-window.innerHeight/2)}px`
      this.hideCoord[0] = 2*(x-window.innerWidth/2)
      this.hideCoord[1] = 2*(y-window.innerHeight/2)
    } else {
      this.el.querySelector('.contentPopup').style.marginLeft = `0px`
      this.el.querySelector('.contentPopup').style.marginTop = `0px`
      this.hideCoord[0] = 0
      this.hideCoord[1] = 0
    }
    setTimeout(() => {
      this.el.style.backdropFilter = 'blur(5px)'
      this.el.querySelector('.contentPopup').style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)'
      if ((x && y) || (x === 0 && y === 0)) {
        this.el.querySelector('.contentPopup').style.marginLeft = `0px`
        this.el.querySelector('.contentPopup').style.marginTop = `0px`
      }
      setTimeout(() => {
        this.animate = false
      }, 300);
    }, 10);
  }

  hide() {
    this.animate = true
    setTimeout(() => {
      this.el.style.backdropFilter = 'blur(0px)'
      this.el.querySelector('.contentPopup').style.transform = 'scale(0) rotateX(360deg) rotateY(360deg)'
      this.el.querySelector('.contentPopup').style.marginLeft = `${this.hideCoord[0]}px`
      this.el.querySelector('.contentPopup').style.marginTop = `${this.hideCoord[1]}px`
      setTimeout(() => {
        this.animate = false
        this.el.style.display = 'none'
      }, 300)
    }, 10);
  }

  showNoAnim(x?: number, y?: number) {
    this.el.style.display = 'flex'
    this.el.querySelector('.contentPopup').style.marginLeft = `0px`
    this.el.querySelector('.contentPopup').style.marginTop = `0px`
    this.el.querySelector('.contentPopup').style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)'
    this.el.style.backdropFilter = 'blur(5px)'
    if ((x && y) || (x === 0 && y === 0)) {
      this.hideCoord[0] = 2*(x-window.innerWidth/2)
      this.hideCoord[1] = 2*(y-window.innerHeight/2)
    } else {
      this.hideCoord[0] = 0
      this.hideCoord[1] = 0
    }
  }

  hideNoAnim() {
    this.el.style.display = 'none'
    this.el.style.backdropFilter = 'blur(0px)'
    this.el.querySelector('.contentPopup').style.transform = 'scale(0) rotateX(360deg) rotateY(360deg)'
    this.el.querySelector('.contentPopup').style.marginLeft = `${this.hideCoord[0]}px`
    this.el.querySelector('.contentPopup').style.marginTop = `${this.hideCoord[1]}px`
  }

  ngOnInit(): void {
    let isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    if (isTouch) {
      this.el.querySelector('.contentPopup').style.height = "90%"
      this.el.querySelector('.contentPopup').style.width = "90%"
    }
  }

}
