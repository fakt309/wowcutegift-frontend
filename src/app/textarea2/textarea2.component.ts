import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-textarea2',
  templateUrl: './textarea2.component.html',
  styleUrls: ['./textarea2.component.scss']
})
export class Textarea2Component implements OnInit {

  constructor(private host: ElementRef) {}
  el: any = this.host.nativeElement
  @Input('value') value: any = ""
  @Input('low') low: any = 0
  @Input('limit') limit: any = 150
  length: number = 0
  @Output() newItemEvent = new EventEmitter<string>();

  ngOnInit(): void {
    this.el.querySelector('textarea').addEventListener('input', () => {
      this.value = this.el.querySelector('textarea').value
      let vall = this.value.replace(/<br>/g, '\n')
      if (this.value.length > this.limit) {
        vall = vall.slice(0, this.limit)
        this.el.querySelector('textarea').value = vall
      }

      this.length = vall.length
      if (this.length < this.low) {
        this.el.querySelector('.count').style.color = '#f44336'
      } else if (this.length >= this.low) {
        this.el.querySelector('.count').style.color = '#8bc34a'
      }
      this.newItemEvent.emit(vall);
    })
  }

  ngOnChanges() {
    if (!this.value) return
    let vall = this.value.replace(/<br>/g, '\n')
    if (this.value.length > this.limit) {
      vall = vall.slice(0, this.limit)
    }
    this.value = vall
    this.length = vall.length
    if (this.length < this.low) {
      this.el.querySelector('.count').style.color = '#f44336'
    } else if (this.length >= this.low) {
      this.el.querySelector('.count').style.color = '#8bc34a'
    }
    this.newItemEvent.emit(vall);
  }

}
