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

  @Input('w') width: number = 300
  @Input('h') height: number = 200
  @Input('d') depth: number = 400
  @Input('color') color: string = "#c3aa83"
  @Input('unpack') unbox: boolean = true

  bind1: boolean = false
  bind2: boolean = false

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

  ngOnInit(): void {
    
  }

  ngOnChanges(): void {
  }
}

// export interface Clip {
//   w: number;
//   h: number;
//   trnsf: string;
//   wTrngl: number;
//   hTrngl: number;
//   wMiddle: number;
//   hMiddle: number;
//   trnsfTrngl1: string;
//   trnsfTrngl2: string;
//   wFillTrngl1: number;
//   hFillTrngl2: number;
//   trnsfFillTrngl1: string;
//   trnsfFillTrngl2: string;
// }
// setClips(): void {
//   let h = 0.4*this.height
//   let w = h/5
//   for (let i = 0; i < 5; i++) {
//     this.clips[i] = {
//       w: w,
//       h: h,
//       trnsf: ``,
//       wTrngl: w,
//       hTrngl: w,
//       wMiddle: w,
//       hMiddle: h-2*w,
//       wFillTrngl1: w*(2**(1/2)),
//       hFillTrngl2: w*(2**(1/2))/2,
//       trnsfTrngl1: `translateY(${-h/2+w/2}px) rotateX(0deg)`,
//       trnsfTrngl2: `translateY(${h/2-w/2}px) rotateX(0deg)`,
//       trnsfFillTrngl1: `translateX(${-0.25*w}px) translateY(${0.25*w}px) rotateZ(45deg)`,
//       trnsfFillTrngl2: `translateX(${-0.25*w}px) translateY(${-0.25*w}px) rotateZ(-45deg)`
//     }
//   }
//   this.clips[0].trnsf = `translateX(${this.width/2+w/2}px) rotateY(0deg)`
//   this.clips[1].trnsf = `translateX(${-this.width/2+w/2}px) rotateZ(180deg) rotateY(0deg)`
//   this.clips[2].trnsf = `translateX(${this.width/2+w/2}px) rotateY(0deg)`
//   this.clips[3].trnsf = `translateX(${-this.width/2+w/2}px) rotateZ(180deg) rotateY(0deg)`
//   h = 0.4*this.depth
//   w = h/5
//   this.clips[4] = {
//     w: w,
//     h: h,
//     trnsf: `translateX(${this.width/2+w/2}px) rotateY(0deg)`,
//     wTrngl: w,
//     hTrngl: w,
//     wMiddle: w,
//     hMiddle: h-2*w,
//     wFillTrngl1: w*(2**(1/2)),
//     hFillTrngl2: w*(2**(1/2))/2,
//     trnsfTrngl1: `translateY(${-h/2+w/2}px) rotateX(0deg)`,
//     trnsfTrngl2: `translateY(${h/2-w/2}px) rotateX(0deg)`,
//     trnsfFillTrngl1: `translateX(${-0.25*w}px) translateY(${0.25*w}px) rotateZ(45deg)`,
//     trnsfFillTrngl2: `translateX(${-0.25*w}px) translateY(${-0.25*w}px) rotateZ(-45deg)`
//   }
// }
