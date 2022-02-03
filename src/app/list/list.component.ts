import { Component, Input, HostBinding, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private host: ElementRef) {}

  @HostBinding('class.hideScroll') hideScroll: boolean = false

  el: any = this.host.nativeElement
  prevScroll: any = null

  setSize() {
    let bounding = this.el.parentNode.getBoundingClientRect()
    let empties = this.el.querySelectorAll('.emptyList')
    this.el.style.height = `${bounding.height}px`
    empties[0].style.height = `${bounding.height}px`
    empties[1].style.height = `${bounding.height}px`
  }

  scrollToStart() {
    // let bounding = this.el.parentNode.getBoundingClientRect()
    this.el.scrollTop = 600;
  }

  ngOnInit(): void {
    let isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    if (isTouch) {
      let bounding = this.el.parentNode.getBoundingClientRect()
      let empties = this.el.querySelectorAll('.emptyList')
      empties[0].style.display = 'flex'
      empties[1].style.display = 'flex'
      this.el.scrollTop = bounding.height
      this.hideScroll = true

      this.el.addEventListener('scroll', () => {
        let edges = 25
        let bounding = this.el.getBoundingClientRect()
        if (this.el.prevScroll !== null) {
          if (this.el.scrollTop <= 2*edges) { this.el.scrollTop = 2*edges }
          if (this.el.scrollTop >= this.el.scrollHeight-bounding.height-2*edges) { this.el.scrollTop = this.el.scrollHeight-bounding.height-2*edges }
          if (this.prevScroll < bounding.height-edges || (this.prevScroll > bounding.height+edges && this.prevScroll < this.el.scrollHeight-2*bounding.height-edges) || this.prevScroll > this.el.scrollHeight-2*bounding.height+edges) {
            if (this.el.scrollTop >= bounding.height-edges && this.el.scrollTop <= bounding.height+edges) {
              this.el.scrollTop = bounding.height
              this.el.style.overflow = 'hidden'
              setTimeout(() => { this.el.style.overflow = 'auto' }, 100);
            }
            if (this.el.scrollTop >= this.el.scrollHeight-2*bounding.height-edges && this.el.scrollTop <= this.el.scrollHeight-2*bounding.height+edges) {
              this.el.scrollTop = this.el.scrollHeight-2*bounding.height
              this.el.style.overflow = 'hidden'
              setTimeout(() => { this.el.style.overflow = 'auto' }, 100);
            }
          }
        }
        this.prevScroll = this.el.scrollTop
      })
    }

    window.addEventListener('resize', () => { this.setSize() })
    this.setSize()
  }

}
