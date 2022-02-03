import { Component, OnInit, ElementRef, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-image-list-array',
  templateUrl: './image-list-array.component.html',
  styleUrls: ['./image-list-array.component.scss']
})
export class ImageListArrayComponent implements OnInit {

  constructor(private host: ElementRef) {}
  el: any = this.host.nativeElement

  @Input('img') img: string = ""
  @Input('checked') checked: boolean = false
  @Input('sizeimage') sizeimage: number = 0.6
  @HostBinding('class.check') check: boolean = false

  ngOnInit(): void {
    this.el.style.backgroundImage = `url(${this.img})`
    this.check = this.checked
    this.el.setAttribute('img', this.img)
    this.el.style.backgroundSize = `${this.sizeimage*100}% auto`
  }

  doCheck(flag: boolean) {
    this.check = flag
  }

}
