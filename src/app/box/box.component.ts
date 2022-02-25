import { Component, OnInit, Input, HostBinding } from '@angular/core'

import { AsyncService } from '../async.service'

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {

  constructor() { }

  math: any = Math

  @HostBinding('class.animate') animate: boolean = false
  @HostBinding('class.shadow') shadow: boolean = false // false

  @Input('w') width: number = 300
  @Input('h') height: number = 200
  @Input('d') depth: number = 400
  @Input('color') color: string = "#c3aa83"
  @Input('unpack') unbox: boolean = true
  @Input('wrap') wrap: string = ''
  @Input('package') package: string = '../../assets/box/package/1.jpg'
  @Input('makepackage') makepackage: boolean = false
  @Input('tape') tape: string = '../../assets/box/tape/1.jpg'

  bind1: boolean = false
  bind2: boolean = false

  margin: number = 1

  wrapbind1: boolean = false // false
  wrapbind2: boolean = false // false
  wrapbind3: boolean = false // false

  hidePackage: boolean = true // true
  displayPackage: string = 'none' // none

  widthTape: number = 20

  sides: Array<string> = ['', '', '', '', '', '']

  tapebind1: boolean = false // false

  tapeshow: boolean = false // false
  tapedisplay: boolean = false // false
  bowshow: boolean = false // false
  bowdisplay: boolean = false // false

  // async doShowPackage(): Promise<void> {
  //   this.animate = true
  //   this.displayPackage = 'flex'
  //   await AsyncService.delay(500)
  //   this.hidePackage = false
  //   await AsyncService.delay(2000)
  //   this.animate = false
  //   return new Promise((res) => res())
  // }
  //
  // async undoShowPackage(): Promise<void> {
  //   this.animate = true
  //   await AsyncService.delay(500)
  //   this.hidePackage = true
  //   await AsyncService.delay(2000)
  //   this.animate = false
  //   this.displayPackage = 'none'
  //   return new Promise((res) => res())
  // }

  async doTape(): Promise<void> {
    this.animate = true
    this.tapedisplay = true
    this.bowdisplay = true
    await AsyncService.delay(100)
    this.tapeshow = true
    await AsyncService.delay(1000)
    this.tapebind1 = true
    await AsyncService.delay(2000)
    this.bowshow = true
    await AsyncService.delay(2000)
    return new Promise((res) => res())
  }

  async undoTape(): Promise<void> {
    this.animate = true
    await AsyncService.delay(100)
    this.bowshow = false
    await AsyncService.delay(1000)
    this.tapebind1 = false
    await AsyncService.delay(2000)
    this.tapeshow = false
    await AsyncService.delay(2000)
    this.tapedisplay = false
    this.bowdisplay = false
    return new Promise((res) => res())
  }

  async doPackage(): Promise<void> {
    this.animate = true
    this.displayPackage = 'flex'
    await AsyncService.delay(500)
    this.hidePackage = false
    await AsyncService.delay(1000)
    this.wrapbind1 = true
    await AsyncService.delay(2000)
    this.wrapbind2 = true
    await AsyncService.delay(2000)
    this.wrapbind3 = true
    this.shadow = true
    await AsyncService.delay(2000)
    this.animate = false
    return new Promise((res) => res())
  }

  async undoPackage(): Promise<void> {
    this.animate = true
    await AsyncService.delay(200)
    this.wrapbind3 = false
    this.shadow = false
    await AsyncService.delay(2000)
    this.wrapbind2 = false
    await AsyncService.delay(2000)
    this.wrapbind1 = false
    await AsyncService.delay(2000)
    this.hidePackage = true
    await AsyncService.delay(1000)
    this.displayPackage = 'none'
    await AsyncService.delay(100)
    this.animate = false
    return new Promise((res) => res())
  }

  async pack(): Promise<void> {
    this.animate = true
    await AsyncService.delay(10)
    this.bind1 = true
    await AsyncService.delay(300)
    this.bind1 = false
    await AsyncService.delay(300)
    this.bind2 = true
    await AsyncService.delay(300)
    this.unbox = false
    await AsyncService.delay(300)
    this.animate = false
    return new Promise((res) => res())
  }

  async unpack(): Promise<void> {
    this.animate = true
    await AsyncService.delay(10)
    this.unbox = true
    await AsyncService.delay(300)
    this.bind2 = false
    await AsyncService.delay(300)
    this.animate = false
    return new Promise((res) => res())
  }

  async setWrap(): Promise<void> {
    if (this.wrap == '') {
      this.sides = ['', '', '', '', '', '']
      return
    }
    if (!/^data:image\/png\;base64\,/g.test(this.wrap)) return

    let w = 0, h = 0
    let img = await AsyncService.loadImg(this.wrap)
    const cnvs = document.createElement('canvas')
    const ctx = cnvs.getContext('2d')

    w = this.height, h = this.depth
    cnvs.setAttribute('width', w+'px')
    cnvs.setAttribute('height', h+'px')
    ctx!.drawImage(img, 0, this.height, w, h, 0, 0, w, h)
    this.sides[0] = cnvs.toDataURL("image/png")

    w = this.width, h = this.height
    cnvs.setAttribute('width', w+'px')
    cnvs.setAttribute('height', h+'px')
    ctx!.drawImage(img, this.height, 0, w, h, 0, 0, w, h)
    this.sides[1] = cnvs.toDataURL("image/png")

    w = this.width, h = this.depth
    cnvs.setAttribute('width', w+'px')
    cnvs.setAttribute('height', h+'px')
    ctx!.drawImage(img, this.height, this.height, w, h, 0, 0, w, h)
    this.sides[2] = cnvs.toDataURL("image/png")

    w = this.width, h = this.height
    cnvs.setAttribute('width', w+'px')
    cnvs.setAttribute('height', h+'px')
    ctx!.drawImage(img, this.height, this.height+this.depth, w, h, 0, 0, w, h)
    this.sides[3] = cnvs.toDataURL("image/png")

    w = this.height, h = this.depth
    cnvs.setAttribute('width', w+'px')
    cnvs.setAttribute('height', h+'px')
    ctx!.drawImage(img, this.height+this.width, this.height, w, h, 0, 0, w, h)
    this.sides[4] = cnvs.toDataURL("image/png")

    w = this.width, h = this.depth
    cnvs.setAttribute('width', w+'px')
    cnvs.setAttribute('height', h+'px')
    ctx!.drawImage(img, this.height+this.width+this.height, this.height, w, h, 0, 0, w, h)
    this.sides[5] = cnvs.toDataURL("image/png")
  }

  ngOnInit(): void { }

  ngOnChanges(): void {
    this.setWrap()

    // if (this.makepackage) {
    //   this.doPackage()
    // } else {
    //   this.undoPackage()
    // }

    // if (this.showpackage) {
    //   this.doShowPackage()
    // } else {
    //   this.undoShowPackage()
    // }
  }
}
