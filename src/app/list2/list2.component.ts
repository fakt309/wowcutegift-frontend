import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-list2',
  templateUrl: './list2.component.html',
  styleUrls: ['./list2.component.scss']
})
export class List2Component implements OnInit {

  constructor(private host: ElementRef) { }
  el: any = this.host.nativeElement
  prevScroll: any = null
  listenScroll: boolean = true

  scrollToStart(): void {
    let isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) {
      let bounding = this.el.getBoundingClientRect()
      this.el.scrollTop = bounding.height
    }
  }

  ngOnInit(): void {
    let isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    if (isTouch) {
      this.el.classList.add('hideScroll')
      let empties = this.el.querySelectorAll('.empty')
      empties[0].style.display = 'block'
      empties[1].style.display = 'block'

      // this.el.addEventListener('scroll', () => {
      //   if (!this.listenScroll) { return }
      //   let edges = 25
      //   let bounding = this.el.getBoundingClientRect()
      //   if (this.el.prevScroll !== null) {
      //     // if (this.el.scrollTop <= 2*edges && this.prevScroll <= 3*edges) { this.el.scrollTop = 2*edges }
      //     // if (this.el.scrollTop >= this.el.scrollHeight-bounding.height-2*edges) { this.el.scrollTop = this.el.scrollHeight-bounding.height-2*edges }
      //     if (this.prevScroll < bounding.height-edges || (this.prevScroll > bounding.height+edges && this.prevScroll < this.el.scrollHeight-2*bounding.height-edges) || this.prevScroll > this.el.scrollHeight-2*bounding.height+edges) {
      //       if (this.el.scrollTop >= bounding.height-edges && this.el.scrollTop <= bounding.height+edges) {
      //         this.listenScroll = false
      //         this.el.style.overflow = 'hidden'
      //         setTimeout(() => {
      //           this.el.scrollTop = bounding.height
      //           setTimeout(() => {
      //             this.el.style.overflow = 'auto'
      //             this.listenScroll = true
      //           }, 10);
      //         }, 20);
      //       } else if (this.el.scrollTop >= this.el.scrollHeight-2*bounding.height-edges && this.el.scrollTop <= this.el.scrollHeight-2*bounding.height+edges) {
      //         this.listenScroll = false
      //         this.el.style.overflow = 'hidden'
      //         setTimeout(() => {
      //           this.el.scrollTop = this.el.scrollHeight-2*bounding.height
      //           setTimeout(() => {
      //             this.el.style.overflow = 'auto'
      //             this.listenScroll = true
      //           }, 10);
      //         }, 10);
      //       }
      //     }
      //   }
      //   this.prevScroll = this.el.scrollTop
      // })

      this.scrollToStart()
    }
  }

}
