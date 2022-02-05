import { Component, OnInit, ElementRef, HostBinding, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-slider-gifts',
  templateUrl: './slider-gifts.component.html',
  styleUrls: ['./slider-gifts.component.scss']
})
export class SliderGiftsComponent implements AfterViewInit {

  constructor(private host: ElementRef) { }
  active: boolean = false
  el: any = this.host.nativeElement
  touch: any = {}
  @HostBinding('class.animation') animation: boolean = true
  @ViewChild('demogreetingcard') demogreetingcard: any

  activate(f: boolean) {
    this.active = f
  }

  getValue(): string {
    return this.el.querySelector('.content .option.center').getAttribute('value')
  }

  setSizes(): void {
    setTimeout(() => {
      let sizesDemo = this.el.querySelector('.content .option .display').getBoundingClientRect()
      this.demogreetingcard.setSize((2/3)*sizesDemo.height*0.9, sizesDemo.height*0.9, 2)
      this.demogreetingcard.demoAnimate(true)
      this.demogreetingcard.setText()
    }, 301);
  }

  slideleft(): void {
    let options = this.el.querySelectorAll('.content .option')
    let oldOption = this.el.querySelector('.content .option.center')
    let index = Array.prototype.indexOf.call(options, oldOption)
    if (index > 0) {
      oldOption.classList.remove('center')
      oldOption.classList.add('right')
      options[index-1].classList.remove('left')
      options[index-1].classList.add('center')
    }
  }
  slideright(): void {
    let options = this.el.querySelectorAll('.content .option')
    let oldOption = this.el.querySelector('.content .option.center')
    let index = Array.prototype.indexOf.call(options, oldOption)
    if (index < options.length-1) {
      oldOption.classList.remove('center')
      oldOption.classList.add('left')
      options[index+1].classList.remove('right')
      options[index+1].classList.add('center')
    }
  }

  ngAfterViewInit(): void {
    window.addEventListener('keydown', (e: any) => {
      if (!this.active) return
      let options = this.el.querySelectorAll('.content .option')
      let oldOption = this.el.querySelector('.content .option.center')
      let index = Array.prototype.indexOf.call(options, oldOption)
      if (e.code == 'ArrowLeft') {
        if (index > 0) {
          oldOption.classList.remove('center')
          oldOption.classList.add('right')
          options[index-1].classList.remove('left')
          options[index-1].classList.add('center')
        }
      } else if (e.code == 'ArrowRight') {
        if (index < options.length-1) {
          oldOption.classList.remove('center')
          oldOption.classList.add('left')
          options[index+1].classList.remove('right')
          options[index+1].classList.add('center')
        }
      }
    })
    this.el.querySelector('.content').addEventListener('touchstart', (e: any) => {
      if (!this.active) return
      this.touch.start = e.touches[0].clientX
      this.animation = false
      this.touch.delay = Date.now()
    })
    this.el.querySelector('.content').addEventListener('touchmove', (e: any) => {
      if (!this.active) return
      if (e.touches.length !== 1) return
      let options = this.el.querySelectorAll('.content .option')
      let oldOption = this.el.querySelector('.content .option.center')
      let index = Array.prototype.indexOf.call(options, oldOption)
      let xcoord = e.touches[0].clientX-this.touch.start
      if (options[index-1]) options[index-1].style.marginLeft = `calc(-200% + ${2*xcoord}px)`
      options[index].style.marginLeft = `${2*xcoord}px`
      if (options[index+1]) options[index+1].style.marginLeft = `calc(200% + ${2*xcoord}px)`
    })
    this.el.querySelector('.content').addEventListener('touchend', (e: any) => {
      if (!this.active) return
      let options = this.el.querySelectorAll('.content .option')
      let oldOption = this.el.querySelector('.content .option.center')
      let index = Array.prototype.indexOf.call(options, oldOption)
      let xcoord = e.changedTouches[0].clientX-this.touch.start
      if (options[index-1]) options[index-1].style.removeProperty('margin-left')
      options[index].style.removeProperty('margin-left')
      if (options[index+1]) options[index+1].style.removeProperty('margin-left')
      this.animation = true
      if (Date.now()-this.touch.delay < 200) {
        if (options[index-1] && xcoord > 0) {
          oldOption.classList.remove('center')
          oldOption.classList.add('right')
          options[index-1].classList.remove('left')
          options[index-1].classList.add('center')
        } else if (options[index+1] && xcoord < 0) {
          oldOption.classList.remove('center')
          oldOption.classList.add('left')
          options[index+1].classList.remove('right')
          options[index+1].classList.add('center')
        }
      } else {
        setTimeout(() => {
          if (options[index-1] && xcoord >= window.innerWidth/2) {
            oldOption.classList.remove('center')
            oldOption.classList.add('right')
            options[index-1].classList.remove('left')
            options[index-1].classList.add('center')
          }
          if (options[index+1] && xcoord <= window.innerWidth/2) {
            oldOption.classList.remove('center')
            oldOption.classList.add('left')
            options[index+1].classList.remove('right')
            options[index+1].classList.add('center')
          }
        }, 10);
      }
    })
  }

}
