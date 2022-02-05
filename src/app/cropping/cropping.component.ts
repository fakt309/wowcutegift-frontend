import { Component, OnInit, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-cropping',
  templateUrl: './cropping.component.html',
  styleUrls: ['./cropping.component.scss']
})
export class CroppingComponent implements OnInit {

  constructor(private host: ElementRef) { }
  el: any = this.host.nativeElement

  img: string = ""
  ratio: number = 16/9
  sizeOriginal: any = [0, 0]
  sizeDisplay: any = [0, 0]
  action: any = 'none'
  crop: any = [0, 0, 100, 100]
  delta: any = [0, 0]

  setRation(ratio: number) {
    this.ratio = ratio
  }

  setSize() {
    let bounding = this.el.getBoundingClientRect()
    let w, h;
    if (this.sizeOriginal[0] >= this.sizeOriginal[1]) {
      if (this.sizeOriginal[0] > bounding.width) {
        w = bounding.width
      } else {
        w = this.sizeOriginal[0]
      }
      h = w/(this.sizeOriginal[0]/this.sizeOriginal[1])
    } else if (this.sizeOriginal[0] < this.sizeOriginal[1]) {
      if (this.sizeOriginal[1] > bounding.height) {
        h = bounding.height
      } else {
        h = this.sizeOriginal[1]
      }
      w = h*(this.sizeOriginal[0]/this.sizeOriginal[1])
    }
    this.sizeDisplay = [w, h]
    this.el.querySelector(".image").style.width = `${w}px`
    this.el.querySelector(".image").style.height = `${h}px`
    if (w <= h) {
      this.setCrop(0, 0, w, w/this.ratio)
    } else if (w > h) {
      this.setCrop(0, 0, h*this.ratio, h)
    }

  }

  setImage(img: string) {
    this.img = img
    this.el.querySelector('.image').style.backgroundImage = `url(${this.img})`
    var image = new Image();
    image.onload = () => {
      this.sizeOriginal[0] = image.width
      this.sizeOriginal[1] = image.height
      this.setSize()
    };
    image.src = img;
  }

  getImage(): any {
    return new Promise((resolve, reject) => {
      let bounding = this.el.querySelector('.image').getBoundingClientRect()
      let x = this.crop[0]/bounding.width
      let y = this.crop[1]/bounding.height
      let w = this.crop[2]/bounding.width
      let h = this.crop[3]/bounding.height

      let img = new Image
      img.onload = () => {
        let cnvs = document.createElement('canvas')
        let ctx = cnvs.getContext('2d')
        cnvs.setAttribute('width', `${w*img.naturalWidth}px`)
        cnvs.setAttribute('height', `${h*img.naturalHeight}px`)
        ctx!.drawImage(img, x*img.naturalWidth, y*img.naturalHeight, w*img.naturalWidth, h*img.naturalHeight, 0, 0, w*img.naturalWidth, h*img.naturalHeight)
        resolve(cnvs.toDataURL("image/png"))
      }
      img.src = this.img
    })
  }

  setCrop(x: number, y: number, w: number, h: number) {
    this.el.querySelector('.image .crop').style.marginLeft = `${x}px`
    this.el.querySelector('.image .crop').style.marginTop = `${y}px`
    this.el.querySelector('.image .crop').style.width = `${w}px`
    this.el.querySelector('.image .crop').style.height = `${h}px`
    this.crop = [x, y, w, h]
  }

  ngOnInit(): void {
    this.el.querySelector('.image .crop').addEventListener('touchstart', (e: any) => {
      let bounding = this.el.querySelector(".image").getBoundingClientRect()
      if (e.target.classList[0] == 'circle') {
        this.action = 'resize'
      } else {
        this.action = 'move'
      }
      this.delta = [e.touches[0].clientX-(bounding.left+this.crop[0]), e.touches[0].clientY-(bounding.top+this.crop[1])]
    })
    this.el.querySelector('.image .crop').addEventListener('touchend', (e: any) => {
      this.action = 'none'
    })
    this.el.addEventListener('touchmove', (e: any) => {
      if (e.touches.length > 1) { return }
      let bounding = this.el.querySelector(".image").getBoundingClientRect()
      let x = e.touches[0].clientX-bounding.left
      let y = e.touches[0].clientY-bounding.top
      if (this.action == 'move') {
        x -= this.delta[0]
        y -= this.delta[1]
        if (x < 0) { x = 0 }
        if (x > bounding.width-this.crop[2]) { x = bounding.width-this.crop[2] }
        if (y < 0) { y = 0 }
        if (y > bounding.height-this.crop[3]) { y = bounding.height-this.crop[3] }
        this.setCrop(x, y, this.crop[2], this.crop[3])
      } else if (this.action == 'resize') {
        let range = (x**2+y**2)**(1/2)
        let w = 0
        let h = 0
        if (this.ratio >= 1) {
          w = x-this.crop[0]
          h = w/this.ratio
        } else if (this.ratio < 1) {
          h = y-this.crop[1]
          w = h*this.ratio
        }
        if (w+this.crop[0] > bounding.width) {
          w = bounding.width-this.crop[0]
          h = w/this.ratio
        }
        if (h+this.crop[1] > bounding.height) {
          h = bounding.height-this.crop[1]
          w = h*this.ratio
        }
        if (w < 50) {
          w = 50
          h = w/this.ratio
        }
        if (h < 50) {
          h = 50
          w = h*this.ratio
        }
        this.setCrop(this.crop[0], this.crop[1], w, h)
      }
    })
    this.el.querySelector('.image .crop').addEventListener('mousedown', (e: any) => {
      let bounding = this.el.querySelector(".image").getBoundingClientRect()
      if (e.target.classList[0] == 'circle') {
        this.action = 'resize'
      } else {
        this.action = 'move'
      }
      this.delta = [e.clientX-(bounding.left+this.crop[0]), e.clientY-(bounding.top+this.crop[1])]
    })
    this.el.querySelector('.image .crop').addEventListener('mouseup', (e: any) => {
      this.action = 'none'
    })
    this.el.querySelector('.image').addEventListener('mouseleave', (e: any) => {
      this.action = 'none'
    })
    this.el.addEventListener('mousemove', (e: any) => {
      let bounding = this.el.querySelector(".image").getBoundingClientRect()
      let x = e.clientX-bounding.left
      let y = e.clientY-bounding.top
      if (this.action == 'move') {
        x -= this.delta[0]
        y -= this.delta[1]
        if (x < 0) { x = 0 }
        if (x > bounding.width-this.crop[2]) { x = bounding.width-this.crop[2] }
        if (y < 0) { y = 0 }
        if (y > bounding.height-this.crop[3]) { y = bounding.height-this.crop[3] }
        this.setCrop(x, y, this.crop[2], this.crop[3])
      } else if (this.action == 'resize') {
        let range = (x**2+y**2)**(1/2)
        let w = 0
        let h = 0
        if (this.ratio >= 1) {
          w = x-this.crop[0]
          h = w/this.ratio
        } else if (this.ratio < 1) {
          h = y-this.crop[1]
          w = h*this.ratio
        }
        if (w+this.crop[0] > bounding.width) {
          w = bounding.width-this.crop[0]
          h = w/this.ratio
        }
        if (h+this.crop[1] > bounding.height) {
          h = bounding.height-this.crop[1]
          w = h*this.ratio
        }
        if (w < 50) {
          w = 50
          h = w/this.ratio
        }
        if (h < 50) {
          h = 50
          w = h*this.ratio
        }
        this.setCrop(this.crop[0], this.crop[1], w, h)
      }
    })
  }

}
