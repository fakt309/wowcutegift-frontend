import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-edit-option',
  templateUrl: './edit-option.component.html',
  styleUrls: ['./edit-option.component.scss']
})
export class EditOptionComponent implements OnInit {

  constructor(private host: ElementRef) {}
  el: any = this.host.nativeElement

  @Input('title') title: string = ''
  @Input('val') val: string = ''

  setValue(val: string) {
    this.val = val
  }

  ngOnInit(): void {
    this.el.addEventListener('mousedown', (e: any) => {
      this.el.style.removeProperty('animation-name')
      setTimeout(() => {
        this.el.style.animationName = 'wave'
      }, 10);
    })
    this.el.addEventListener('touchstart', (e: any) => {
      this.el.style.removeProperty('animation-name')
      setTimeout(() => {
        this.el.style.animationName = 'wave'
      }, 10);
    })
  }

}
