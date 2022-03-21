import { Component, Input, HostBinding, ViewChild, ElementRef, AfterViewInit } from '@angular/core'

@Component({
  selector: 'app-greeting-card',
  templateUrl: './greeting-card.component.html',
  styleUrls: [ './greeting-card.component.scss' ]
})
export class GreetingCardComponent implements AfterViewInit {
  constructor(private host: ElementRef) {}

  @HostBinding('class.demoAnim') demoAnim: boolean = false
  @Input('w') w: any = 100
  @Input('h') h: any = 150
  @Input('animate') animate: any = false
  @Input('img') img: any = '../assets/greetingcard/front/1.jpg'
  @Input('imgback') imgback: any = '../assets/greetingcard/back/1.png'
  @Input('text') text: any = 'May you be gifted with life’s biggest joys and never-ending bliss. After all, you yourself are a gift to earth, so you deserve the best. Happy birthday.'
  @Input('sign') sign: any = ''
  @Input('textcolor') textcolor: any = "#000"

  el: any = this.host.nativeElement
  size: any = { x: 0, y: 0, z: 0 }
  colorFront: string = ''
  colorBack: string = ''
  transform: string = ''
  front: string = ''
  back: string = ''

  setSize(x: number, y: number, z: number) {
    this.size.x = x ? x : this.size.x
    this.size.y = y ? y : this.size.y
    this.size.z = z ? z : this.size.z

    this.el.querySelector(".front").style.width = this.size.x+'px'
    this.el.querySelector(".front").style.height = this.size.y+'px'
    this.el.querySelector(".front").style.transform = `translateZ(${this.size.z/2}px)`
    this.el.querySelector(".back").style.width = this.size.x+'px'
    this.el.querySelector(".back").style.height = this.size.y+'px'
    this.el.querySelector(".back").style.transform = `translateZ(${-this.size.z/2}px) rotateY(180deg)`

    this.setText()
  }

  setColorFront(color: string) {
    if (color !== "") this.colorFront = color

    this.el.querySelector(".front").style.backgroundColor = this.colorFront
  }

  setColorBack(color: string) {
    if (color !== "") this.colorBack = color

    this.el.querySelector(".back").style.backgroundColor = this.colorBack
  }

  setTransform(exp: string) {
    this.transform = exp

    this.el.style.transform = this.transform
  }

  setFront(url: string) {
    this.front = url

    this.el.querySelector(".front > .image").style.backgroundImage = `url(${this.front})`
  }

  setBack(url: string) {
    this.back = url

    this.el.querySelector(".back").style.backgroundImage = `url(${this.back})`
  }

  setText(text?: string) {
    if (text) {
      this.text = text
    }

    if (!this.text) return

    let size = 50-this.text.length/50

    size = size*this.size.x/700

    this.el.querySelector(".back > .text").style.fontSize = size+'px'
    this.el.querySelector(".back > .text").innerHTML = this.text
  }

  setSign(url: string) {
    this.sign = url
    this.el.querySelector(".back > .sign").style.backgroundImage = `url(${this.sign})`
  }

  demoAnimate(flag: boolean) {
    this.demoAnim = flag
  }

  setTextColor(color: String) {
    this.textcolor = color
    this.el.querySelector('.back .text').style.color = this.textcolor
  }

  setDefault() {
    let ratio = 350/500
    this.setSize(500, 500/ratio, 2)
    this.setColorFront('#fff7e9')
    this.setColorBack('#a2bfb2')
    this.setFront(this.img)
    this.setBack('../assets/greetingcard/back/1.png')
    this.setText('May you be gifted with life’s biggest joys and never-ending bliss. After all, you yourself are a gift to earth, so you deserve the best. Happy birthday.')
    this.setSign(this.sign)
    this.setTextColor(this.textcolor)
  }

  ngAfterViewInit() {
    // this.setDefault()
    this.setSize(this.w, this.h, 2)
    this.demoAnimate(this.animate)
    this.setText()
  }

  ngOnChanges() {
    if (this.img) this.setFront(this.img)
    if (this.imgback) this.setBack(this.imgback)
    if (this.text) this.setText(this.text)
    if (this.sign || this.sign === '') this.setSign(this.sign)
    if (this.w && this.h) this.setSize(this.w, this.h, 2)
    if (this.textcolor) this.setTextColor(this.textcolor)
  }
}
