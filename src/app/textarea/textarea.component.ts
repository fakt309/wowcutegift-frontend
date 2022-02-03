import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

  constructor(private host: ElementRef) {}
  el: any = this.host.nativeElement
  @Input('value') value: any = 150
  @Input('low') low: any = 0
  @Input('limit') limit: any = 150
  length: number = 0
  @Output() newItemEvent = new EventEmitter<string>();

  ngOnInit(): void {
    this.el.querySelector('input').addEventListener('input', () => {
      this.value = this.el.querySelector('input').value
      if (this.value.length > this.limit) {
        this.value = this.value.slice(0, this.limit)
        this.el.querySelector('input').value = this.value
      }

      this.length = this.value.length
      if (this.length < this.low) {
        this.el.querySelector('.count').style.color = '#f44336'
      } else if (this.length >= this.low) {
        this.el.querySelector('.count').style.color = '#8bc34a'
      }
      this.newItemEvent.emit(this.value);
    })
  }

  ngOnChanges() {
    if (!this.value) return
    if (this.value.length > this.limit) {
      this.value = this.value.slice(0, this.limit)
      this.el.querySelector('input').value = this.value
    }
    this.length = this.value.length
    if (this.length < this.low) {
      this.el.querySelector('.count').style.color = '#f44336'
    } else if (this.length >= this.low) {
      this.el.querySelector('.count').style.color = '#8bc34a'
    }
    this.newItemEvent.emit(this.value);
  }

}
