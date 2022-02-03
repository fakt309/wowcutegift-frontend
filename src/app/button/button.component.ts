import { Component, OnInit, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  constructor(private host: ElementRef) { }
  el: any = this.host.nativeElement

  @Input('color') color: string = ""
  @Input('ico') ico: string = ""

  show() {
    this.el.style.display = 'flex'
  }

  hide() {
    this.el.style.display = 'none'
  }

  ngOnInit(): void {
    this.el.style.backgroundColor = this.color
    this.el.style.boxShadow = `0px 0px 0px 0px ${this.color}`
    if (this.ico !== "") {
      this.el.querySelector('.ico').style.display = `flex`
      this.el.querySelector('.ico').style.backgroundImage = `url(${this.ico})`
    }

    this.el.addEventListener('mousedown', () => {
      this.el.style.boxShadow = `0px 0px 10px 10px ${this.color}`
      setTimeout(() => {
        this.el.style.boxShadow = `0px 0px 0px 0px ${this.color}`
      }, 100);
    })
  }

}
