import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-empty-list',
  templateUrl: './empty-list.component.html',
  styleUrls: ['./empty-list.component.scss']
})
export class EmptyListComponent implements OnInit {

  constructor(private host: ElementRef) { }
  el: any = this.host.nativeElement

  ngOnInit(): void {
    let bounding = this.el.getBoundingClientRect()
    let w = 0
    let h = 0
    let percentage = 0.8
    let border = 10
    if (bounding.width <= bounding.height) {
      w = percentage*bounding.width
      h = percentage*bounding.width
    } else if (bounding.width > bounding.height) {
      w = percentage*bounding.height
      h = percentage*bounding.height
    }
    this.el.querySelector('.circle').style.width = `${w}px`
    this.el.querySelector('.circle').style.height = `${h}px`
    this.el.querySelector('.insidecircle').style.minWidth = `${w-border}px`
    this.el.querySelector('.insidecircle').style.minHeight = `${h-border}px`
    this.el.querySelector('.insidecircle').style.maxWidth = `${w-border}px`
    this.el.querySelector('.insidecircle').style.maxHeight = `${h-border}px`
  }

}
