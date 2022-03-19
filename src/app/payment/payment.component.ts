import { Component, OnInit, HostBinding, HostListener, ElementRef } from '@angular/core';

import { AsyncService } from '../async.service'

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(private host: ElementRef) { }

  isTouch: boolean = false
  widthcard: number = 0

  stage: number = 0

  back: boolean = false

  error: any = {
    show: false,
    text: '',
    x: -1000,
    y: -1000
  }

  number: string = ''
  exp: string = ''
  holder: string = ''
  ccvcvv: string = ''

  style: any = {
    fontsizetitle: 20,
    fontsizetext: 20,
    heightinput: 20,
    fontsizeinput: 20,
    transform: 'translateY(0px)'
  }

  touch: any = {
    start: 0,
    oldData: 0
  }

  @HostListener('window:resize')
  onResize() {
    if (this.isTouch) {
      this.widthcard = 0.9*window.innerWidth
    } else {
      let w = window.innerWidth > 500 ? 500 : window.innerWidth
      this.widthcard = 0.9*w
    }
    let h = this.widthcard/(85.60/53.98)
    this.style.fontsizetitle = 0.1*h
    this.style.fontsizetext = 0.04*h
    this.style.heightinput = 0.07*h
    this.style.fontsizeinput = 0.05*h
  }

  @HostListener('touchstart', ['$event'])
  onStart(e: any): void {
    if (!this.isTouch || e.touches.length != 1) return
    this.touch.start = e.touches[0].clientY
  }
  @HostListener('touchend', ['$event'])
  onEnd(e: any): void {
    if (!this.isTouch || e.changedTouches.length != 1) return
    let y = e.changedTouches[0].clientY-this.touch.start
    this.touch.oldData += y
  }
  @HostListener('touchmove', ['$event'])
  onMove(e: any): void {
    if (!this.isTouch || e.touches.length != 1) return
    let y = e.touches[0].clientY-this.touch.start
    let data = this.touch.oldData+y
    if (data > window.innerHeight/2) data = window.innerHeight/2
    if (data < -window.innerHeight/2) data = -window.innerHeight/2
    this.style.transform = `translateY(${data}px)`
  }

  validNumber(e: any): void {
    let el = e.srcElement
    let value = el.value
    value = value.replace(/[^0-9]/g, "")
    let arr = []
    for (let i = 0; 4*i < value.length; i++) {
      arr[i] = value.substr(4*i, 4)
    }
    value = arr.join(" ")
    el.value = value
    this.number = value.replace(/ /g, "")
  }

  validDate(e: any): void {
    let el = e.srcElement
    let value = el.value
    value = value.replace(/[^0-9]/g, "")
    value = value.substr(0, 4)
    value = [value.substr(0, 2), value.substr(2, 2)]
    if (value[1] != '') {
      value = value.join("/")
    } else {
      value = value[0]
    }
    el.value = value
    this.exp = value
  }

  validHolder(e: any): void {
    let el = e.srcElement
    let value = el.value.toUpperCase()
    value = value.replace(/[^A-Z ]/g, "")
    el.value = value
    this.holder = value
  }

  validCCVCVV(e: any): void {
    let el = e.srcElement
    let value = el.value.toUpperCase()
    value = value.replace(/[^0-9]/g, "")
    value = value.substr(0, 3)
    el.value = value
    this.ccvcvv = value
  }

  timeout1: any = setTimeout(() => {}, 0);
  showError(text: string, x: number, y: number): Promise<void> {
    this.error.x = x
    this.error.y = y
    this.error.text = text
    this.error.show = true
    clearTimeout(this.timeout1)
    this.timeout1 = setTimeout(() => {
      this.error.show = false
      setTimeout(() => {
        this.error.text = ''
      }, 300);
    }, 3000);
    return new Promise(res => res())
  }

  goNext(): void {

    if (this.stage == 0) {
      console.log(this.number)
      if (this.number.length < 8 || this.number.length > 19) {
        let bounding = this.host.nativeElement.querySelector('.content > .cards > .card > .cardnumber').getBoundingClientRect()
        this.showError('Mininmum length 7, maximum 20', bounding.x, bounding.y+30)
        return
      } else if (this.exp.length != 5) {
        let bounding = this.host.nativeElement.querySelector('.content > .cards > .card > .date > .value > .carddate').getBoundingClientRect()
        console.log(bounding)
        this.showError('Fill in the expiration date', bounding.x, bounding.y+30)
        return
      } else if (this.holder.length == 0) {
        let bounding = this.host.nativeElement.querySelector('.content > .cards > .card > .cardholder').getBoundingClientRect()
        this.showError('Fill in the holder name', bounding.x, bounding.y+30)
        return
      }
      this.stage = 1
      this.back = true
    } else if (this.stage == 1) {
      if (this.ccvcvv.length != 3) {
        let bounding = this.host.nativeElement.querySelector('.content > .cards > .backcard > .ccvcvv').getBoundingClientRect()
        this.showError('The length of the ccv/cvv code must be three digits', bounding.x, bounding.y+30)
        return
      }
      console.log('go')
    }

  }

  goBack(): void {
    if (this.stage == 0) {
      console.log('back')
    } else if (this.stage == 1) {
      this.stage = 0
      this.back = false
    }
  }

  ngOnInit(): void {
    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    this.onResize()
  }

}
