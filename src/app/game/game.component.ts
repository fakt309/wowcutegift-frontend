import { Component, OnInit, Input, ElementRef, HostBinding } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private host: ElementRef) {}
  el: any = this.host.nativeElement

  ratio: number = 135/190
  ratio2: number = 135/15

  @Input('size') w: number = 200
  @Input('color') color: string = '#000'
  @Input('img') img: string = ''
  @Input('open') open: boolean = false
  @Input('wrap') wrap: string = ''
  @Input('holes') holes: any = []
  @Input('code') code: any = []
  @Input('leftimg') leftimg: string = ''
  @Input('animate') animate: boolean = false
  @Input('scratch') scratch: boolean = false

  @HostBinding('class.animate') animateBind: boolean = false

  canScratch: boolean = false

  h: number = this.w/this.ratio
  d: number = this.w/this.ratio2
  rotateLid: number = 0

  sizeCorner: number = this.w*0.1
  sizePartCorner: number = this.sizeCorner/(Math.cos((22.5/180)*Math.PI)+Math.cos((45/180)*Math.PI)+Math.cos((67.5/180)*Math.PI))
  shiftPartCorner: any = {
    x: this.sizePartCorner*Math.cos((45/180)*Math.PI)/2+this.sizePartCorner*Math.cos((22.5/180)*Math.PI)/2,
    y: this.sizePartCorner*Math.sin((45/180)*Math.PI)/2+this.sizePartCorner*Math.sin((22.5/180)*Math.PI)/2
  }
  shiftPartCorner2: any = this.sizePartCorner*Math.cos((45/180)*Math.PI)/2+this.sizePartCorner*Math.sin((22.5/180)*Math.PI)
  shiftPartCorner3: any = {
    x: 3*this.sizePartCorner*Math.cos((22.5/180)*Math.PI)/2,
    y: 3*this.sizePartCorner*Math.sin((22.5/180)*Math.PI)/2
  }
  shiftPartCorner4: any = {
    x: 3*this.sizePartCorner*Math.cos((45/180)*Math.PI)/2,
    y: 3*this.sizePartCorner*Math.sin((45/180)*Math.PI)/2
  }

  delay(ms: number) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(true)
      }, ms);
    })
  }

  async openAnim(): Promise<boolean> {
    const speed = 3
    while (this.rotateLid > -180) {
      await this.delay(5)
      this.rotateLid -= speed
    }
    return new Promise((res, rej) => {
      res(true)
    })
  }

  async closeAnim(): Promise<boolean> {
    const speed = 3
    while (this.rotateLid < 0) {
      await this.delay(5)
      this.rotateLid += speed
    }
    return new Promise((res, rej) => {
      res(true)
    })
  }

  async loadImg(url: string): Promise<any> {
    return new Promise((res, rej) => {
      let img = new Image()
      img.onload = () => { res(img) }
      img.onerror = () => { rej(false) }
      img.src = url
    })
  }

  async setCanvas(): Promise<void> {
    const cnvs = this.el.querySelector('.lid.bottom .front .scratch canvas')
    const size = { w: this.w*0.8, h: this.h*0.1 }
    const sizeHole = 0.05*size.w
    const ctx = cnvs.getContext('2d')
    let img = await this.loadImg('../../assets/game/scratch.jpg')
    const pattern = ctx.createPattern(img, 'repeat')
    ctx.rect(0, 0, size.w, size.h)
    ctx.fillStyle = pattern
    ctx.fill()
    for (let i = 0; i < this.holes.length; i++) {
      ctx.save()
      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath()
      ctx.arc(this.holes[i][0]*size.w, this.holes[i][1]*size.h, sizeHole, 0, 2*Math.PI)
      ctx.fill()
      ctx.restore();
    }
    this.el.setAttribute('holes', JSON.stringify(this.holes))
  }

  addHole(e: any): void {
    if (!this.scratch) return
    if (!this.canScratch) return
    if (e.touches && e.touches.length > 1) return
    let x, y
    let bounding = e.target.getBoundingClientRect()
    if (e.touches) {
      x = e.touches[0].clientX-bounding.x
      y = e.touches[0].clientY-bounding.y
    } else {
      x = e.clientX-bounding.x
      y = e.clientY-bounding.y
    }
    this.holes.push([x/bounding.width, y/bounding.height])
    this.setCanvas()
  }

  setAnimate(): void {
    if (this.animate) this.animateBind = true
    if (!this.animate) this.animateBind = false
  }

  ngOnInit(): void {
    this.setCanvas()
    this.setAnimate()
  }

  ngOnChanges(): void {
    this.h = this.w/this.ratio
    this.d = this.w/this.ratio2

    this.sizeCorner = this.w*0.1
    this.sizePartCorner = this.sizeCorner/(Math.cos((22.5/180)*Math.PI)+Math.cos((45/180)*Math.PI)+Math.cos((67.5/180)*Math.PI))
    this.shiftPartCorner = {
      x: this.sizePartCorner*Math.cos((45/180)*Math.PI)/2+this.sizePartCorner*Math.cos((22.5/180)*Math.PI)/2,
      y: this.sizePartCorner*Math.sin((45/180)*Math.PI)/2+this.sizePartCorner*Math.sin((22.5/180)*Math.PI)/2
    }
    this.shiftPartCorner2 = this.sizePartCorner*Math.cos((45/180)*Math.PI)/2+this.sizePartCorner*Math.sin((22.5/180)*Math.PI)
    this.shiftPartCorner3 = {
      x: 3*this.sizePartCorner*Math.cos((22.5/180)*Math.PI)/2,
      y: 3*this.sizePartCorner*Math.sin((22.5/180)*Math.PI)/2
    }
    this.shiftPartCorner4 = {
      x: 3*this.sizePartCorner*Math.cos((45/180)*Math.PI)/2,
      y: 3*this.sizePartCorner*Math.sin((45/180)*Math.PI)/2
    }

    if (this.open) {
      this.openAnim()
    } else {
      this.closeAnim()
    }

    this.setCanvas()
    this.setAnimate()
  }

}
