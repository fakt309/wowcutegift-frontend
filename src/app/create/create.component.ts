import { Component, AfterViewInit, ElementRef, ViewChild, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router'

import { CookieService } from 'ngx-cookie-service'
import { AsyncService } from '../async.service'
import { DatabaseService } from '../database.service'

const getBase64FromUrl = async (url: string) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    }
  });
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements AfterViewInit {

  constructor(private host: ElementRef, public router: Router, private cookieService: CookieService,  private databaseService: DatabaseService) { }

  @ViewChild('nextbutton') nextbutton: any
  @ViewChild('addpopup') addpopup: any
  @ViewChild('slideradd') slideradd: any
  @ViewChild('editgreetingpopup') editgreetingpopup: any
  @ViewChild('listEditGreeting') listEditGreeting: any
  @ViewChild('editgreetingcard') editgreetingcard: any
  @ViewChild('editingtitle') editingtitle: any
  @ViewChild('listEditingTitle') listEditingTitle: any
  @ViewChild('texttitle') texttitle: any
  @ViewChild('croppingfrontgreeting') croppingfrontgreeting: any
  @ViewChild('croppingobjectfrontgreeting') croppingobjectfrontgreeting: any
  @ViewChild('skeletonArrayFrontImages') skeletonArrayFrontImages: any
  @ViewChild('uploadfrontgreetingpopup') uploadfrontgreetingpopup: any
  @ViewChild('editoptionfront') editoptionfront: any
  @ViewChild('croppingobjectbackgreeting') croppingobjectbackgreeting: any
  @ViewChild('skeletonArrayBackImages') skeletonArrayBackImages: any
  @ViewChild('uploadbackgreetingpopup') uploadbackgreetingpopup: any
  @ViewChild('croppingbackgreeting') croppingbackgreeting: any
  @ViewChild('editoptionback') editoptionback: any
  @ViewChild('textareaTextGreeting') textareaTextGreeting: any
  @ViewChild('erasebuttonsigngreeting') erasebuttonsigngreeting: any
  @ViewChild('drawingobjectsigngreeting') drawingobjectsigngreeting: any
  @ViewChild('drawsigncolorpickgreetingpopup') drawsigncolorpickgreetingpopup: any
  @ViewChild('editingtextcolor') editingtextcolor: any
  @ViewChild('editgamepopup') editgamepopup: any
  @ViewChild('listEditGame') listEditGame: any
  @ViewChild('texttitlegame') texttitlegame: any
  @ViewChild('listEditingPlatformGame') listEditingPlatformGame: any
  @ViewChild('textcodegame') textcodegame: any
  @ViewChild('croppingobjectfrontgame') croppingobjectfrontgame: any
  @ViewChild('uploadfrontgamepopup') uploadfrontgamepopup: any
  @ViewChild('croppingfrontgame') croppingfrontgame: any
  @ViewChild('editingcolorgame') editingcolorgame: any
  @ViewChild('croppingobjectwrapgame') croppingobjectwrapgame: any
  @ViewChild('croppingwrapgame') croppingwrapgame: any
  @ViewChild('uploadwrapgamepopup') uploadwrapgamepopup: any
  @ViewChild('boxWorkplace') boxWorkplace: any

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setSizesDemoSlider()
    this.rack.w = window.innerHeight*(4000/1080)
    this.rack.h = window.innerHeight
  }

  @HostListener('window:load', ['$event'])
  onLoad() {
    this.rack.w = window.innerHeight*(4000/1080)
    this.rack.h = window.innerHeight
  }

  @HostListener('window:click', ['$event'])
  onClick() {
    if (this.rack.click) {
      this.rack.click = false
      this.forwardToWorkplace()
    }
  }

  @HostListener('window:touchstart', ['$event'])
  onTouchstart() {
    if (this.rack.click) {
      this.rack.click = false
      this.forwardToWorkplace()
    }
  }

  el: any = this.host.nativeElement
  gifts: any = [
    // { id: 0, title: 'FirstFirstFirstFirstFirstFirstFirstFirstFirs FirstFirstFirstFirstFirstFirstFirstFirstFirstFirstFirstFirst First First' },
    // { id: 1, title: 'Second Second Second Second' },
    // { id: 2, title: 'Third' },
    // { id: 3, title: 'Fourth' }
  ]
  edititngGift: any = {
    title: ''
  }
  bucks: any = {
    value: 0,
    exact: false,
    exists: true
  }
  box: any = {
    size: { x: 200, y: 100, z: 200 },
    transform: `rotateX(90deg) rotateY(0deg)`,
    animated: false,
    unpack: true,
    package: '../../assets/box/package/1.jpg',
    tape: '../../assets/box/tape/1.jpg'
  }
  isTouch: boolean = true

  sizeforsigngreeting: any = { w: 100, h: 150, translateY: 0, sign: 'a', tool: 'pen', color: '#cc0000' }

  showbucks: boolean = false
  transformFullsreen: string = "translateY(0%)"

  rack: any = { w: 0, h: 0, right: `-1000%`, click: false }

  contextWorkplace: any = { show: false, x: -1000, y: -1000, dbl: false, can: true, trpl: false }

  readyblock: any = { show: false }

  showRestore: boolean = true

  workplace: any = {
    display: `none`,
    transform: `scale(0)`,
    tool: 'pen',
    showcolor: false,
    colorpen: '#000',
    start: [0, 0],
    translateStatic: [0, 0],
    translateDynamic: [0, 0],
    canmove: false,
    img: '',
    showcanvas: false,
    imgBox: '',
    showFirstGui: 2,
    keyframesSecondTextGui: 0,
    stage: -1,
    showgiftlist: false,
    canmovegiftintobox: false,
    activegiftintobox: null,
    wasmoveintobox: false,
    packed: false,
    keyframesThirdGui: 0,
    showlistwraping: false,
    keyframesFourGui: 0,
    showlisttape: false,
    shownav: false,
    imgdrawing: ''
  }

  giftsintobox: Array<any> = []

  timeoutsave: any = setTimeout(() => {}, 0);

  save(): void {

    clearTimeout(this.timeoutsave)

    this.timeoutsave = setTimeout(() => {
      let box: any = {}

      box.gifts = this.gifts
      box.bucks = this.bucks
      box.insidebox = this.workplace.img

      let giftsIntoBox: any = []
      for (let i = 0; i < this.giftsintobox.length; i++) {
        giftsIntoBox[i] = {}
        giftsIntoBox[i].id = this.giftsintobox[i].id
        giftsIntoBox[i].w = this.giftsintobox[i].w
        giftsIntoBox[i].h = this.giftsintobox[i].h
        giftsIntoBox[i].x = this.giftsintobox[i].x
        giftsIntoBox[i].y = this.giftsintobox[i].y
        giftsIntoBox[i].z = this.giftsintobox[i].z
        giftsIntoBox[i].rotate = this.giftsintobox[i].rotate
      }
      box.giftsintobox = giftsIntoBox

      box.package = this.box.package
      box.tape = this.box.tape

      if (this.cookieService.check('idbox')) {
        box.id = this.cookieService.get('idbox')
      }

      let query = {
        typequery: 'insert',
        data: box
      }

      this.databaseService.setBox(query).subscribe((d: any) => {
        console.log(d)
        if (d.success) {
          if (d.created) this.cookieService.set('idbox', d.id, { expires: 5, path: '/' })
        }
      })
    }, 3000)
  }

  restore(): void {

    let query = {
      typequery: 'get',
      id: this.cookieService.get('idbox')
    }

    this.databaseService.setBox(query).subscribe((d: any) => {
      if (d.success) {
        let data = d.box
        this.gifts = data.gifts
        this.bucks = data.bucks
        this.workplace.imgdrawing = data.insidebox
        this.box.package = data.package
        this.box.tape = data.tape

        for (let i = 0; i < data.giftsintobox.length; i++) {
          for (let j = 0; j < this.gifts.length; j++) {
            if (this.gifts[j].id == data.giftsintobox[i].id) {
              data.giftsintobox[i] = {...this.gifts[j], ...data.giftsintobox[i]}
              break
            }
          }
        }
      }
    })
  }

  chooseRestore(val: string) {
    if (val == 'continue') {
      this.restore()
    } else if (val == 'new') {
      this.cookieService.delete('idbox')
    }
    this.showRestore = false
  }

  chooseNavigation(dir: string): void {
    this.workplace.shownav = false
    if (dir == 'next') {
      if (this.workplace.stage == 0) {
        this.forwardToDrawing()
      } else if (this.workplace.stage == 2) {
        this.forwardToWarping()
      } else if (this.workplace.stage == 4) {
        this.forwardToBow()
      } else if (this.workplace.stage == 6) {
        this.forwardToReady()
      }
    } else if (dir == 'back') {
      if (this.workplace.stage == 0) {
        this.backToGifts()
      } else if (this.workplace.stage == 2) {
        this.backToDrawing()
      } else if (this.workplace.stage == 4) {
        this.backToIntoGifts()
      } else if (this.workplace.stage == 6) {
        this.backToWarping()
      }
    }
  }

  async forwardToDrawing(): Promise<void> {
    this.workplace.stage = 1
    this.workplace.showcanvas = false
    this.workplace.imgBox = this.workplace.img
    await AsyncService.delay(10)
    this.workplace.showFirstGui = 1
    await AsyncService.delay(300)
    this.workplace.showFirstGui = 0
    this.workplace.keyframesSecondTextGui = 1
    this.box.animated = true
    await AsyncService.delay(10)
    this.box.transform = 'rotateX(-15deg) rotateY(-15deg)'
    this.workplace.keyframesSecondTextGui = 2
    await AsyncService.delay(2000)
    this.box.transform = 'rotateX(-15deg) rotateY(345deg)'
    await AsyncService.delay(2000)
    this.box.animated = false
    this.box.transform = 'rotateX(-15deg) rotateY(-15deg)'
    await AsyncService.delay(100)
    this.box.animated = true
    await AsyncService.delay(100)
    this.box.transform = 'rotateX(-90deg) rotateY(0deg)'
    this.workplace.keyframesSecondTextGui = 3
    await AsyncService.delay(2000)
    this.box.animated = false
    this.workplace.stage = 2
    this.workplace.tool = ""
  }

  refreshable(flag: boolean = false): void {
    if (flag) {
      document.body.classList.remove("unrefreshable")
    } else {
      document.body.classList.add("unrefreshable")
    }
  }

  changeColorWorkplace(e: any) {
    this.workplace.showcolor = false
    this.workplace.colorpen = e
  }

  changeToolWorkplace(tool: string) {
    this.contextWorkplace.show = false
    if (tool == 'color') {
      this.workplace.showcolor = true
      this.workplace.tool = 'pen'
    } else if (tool != '') {
      this.workplace.tool = tool
    }
    setTimeout(() => {
      this.contextWorkplace.x = -1000
      this.contextWorkplace.y = -1000
      this.contextWorkplace.can = true
    }, 300)
  }

  timeoutsTblTrpl: any = [setTimeout(() => {}, 0), setTimeout(() => {}, 0)]
  testdbltouchWorkplace(e: any) {
    if (e.changedTouches && !this.isTouch) return
    if (!e.changedTouches && this.isTouch) return
    if (this.contextWorkplace.trpl) {
      clearTimeout(this.timeoutsTblTrpl[1])
      this.contextWorkplace.dbl = false
      this.contextWorkplace.trpl = false
      if (!this.isTouch) return
      if (e.target.classList[0] == 'additButton') return
      // this.trpltouchWorkplace()
      if (this.workplace.stage == 0 || this.workplace.stage == 2 || this.workplace.stage == 4 || this.workplace.stage == 6) {
        this.workplace.shownav = true
      }
    } else if (this.contextWorkplace.dbl) {
      clearTimeout(this.timeoutsTblTrpl[0])
      this.contextWorkplace.trpl = true
      this.timeoutsTblTrpl[1] = setTimeout(() => {
        this.dbltouchWorkplace(e)
        this.contextWorkplace.dbl = false
        this.contextWorkplace.trpl = false
      }, 200)
    } else {
      this.contextWorkplace.dbl = true
      this.timeoutsTblTrpl[0] = setTimeout(() => {
        this.contextWorkplace.dbl = false
        this.contextWorkplace.trpl = false
      }, 200)
    }
  }

  getImgFromWorkplaceDraw(img: string) {
    this.workplace.img = img
    this.save()
  }

  async trpltouchWorkplace(): Promise<void> {
    if (this.workplace.stage == 0) {
      this.workplace.stage = 1
      this.workplace.showcanvas = false
      this.workplace.imgBox = this.workplace.img
      await AsyncService.delay(10)
      this.workplace.showFirstGui = 1
      await AsyncService.delay(300)
      this.workplace.showFirstGui = 0
      this.workplace.keyframesSecondTextGui = 1
      this.box.animated = true
      await AsyncService.delay(10)
      this.box.transform = 'rotateX(-15deg) rotateY(-15deg)'
      this.workplace.keyframesSecondTextGui = 2
      await AsyncService.delay(2000)
      this.box.transform = 'rotateX(-15deg) rotateY(345deg)'
      await AsyncService.delay(2000)
      this.box.animated = false
      this.box.transform = 'rotateX(-15deg) rotateY(-15deg)'
      await AsyncService.delay(100)
      this.box.animated = true
      await AsyncService.delay(100)
      this.box.transform = 'rotateX(-90deg) rotateY(0deg)'
      this.workplace.keyframesSecondTextGui = 3
      await AsyncService.delay(2000)
      this.box.animated = false
      this.workplace.stage = 2
      this.workplace.tool = ""
    } else if (this.workplace.stage == 2) {
      this.forwardToWarping()
    } else if (this.workplace.stage == 4) {
      this.forwardToBow()
    }
  }

  intersectionGifts(gift1: any, gift2: any): boolean {
    let l1 = 0, l2 = 0, r1 = 0, r2 = 0, t1 = 0, t2 = 0, b1 = 0, b2 = 0
    if (gift1.rotate == 0 || gift1.rotate == 180) {
      l1 = gift1.x-gift1.w/2
      r1 = gift1.x+gift1.w/2
      t1 = -gift1.y-gift1.h/2
      b1 = -gift1.y+gift1.h/2
    } else if (gift1.rotate == 90 || gift1.rotate == 270) {
      l1 = gift1.x-gift1.h/2
      r1 = gift1.x+gift1.h/2
      t1 = -gift1.y-gift1.w/2
      b1 = -gift1.y+gift1.w/2
    }
    if (gift2.rotate == 0 || gift2.rotate == 180) {
      l2 = gift2.x-gift2.w/2
      r2 = gift2.x+gift2.w/2
      t2 = -gift2.y-gift2.h/2
      b2 = -gift2.y+gift2.h/2
    } else if (gift2.rotate == 90 || gift2.rotate == 270) {
      l2 = gift2.x-gift2.h/2
      r2 = gift2.x+gift2.h/2
      t2 = -gift2.y-gift2.w/2
      b2 = -gift2.y+gift2.w/2
    }

    if (l1 <= r2 && r1 >= l2) {
      if (t1 <= b2 && b1 >= t2) {
        return true
      }
    }
    return false
  }

  async forwardToReady(): Promise<void> {
    this.workplace.transform = 'scale(0)'
    await AsyncService.delay(1000)
    this.workplace.display = 'none'
    this.readyblock.show = true
    await AsyncService.delay(300)
    return new Promise(res => res())
  }

  async forwardToBow() {
    this.workplace.stage = 5
    this.workplace.keyframesThirdGui = 1
    this.box.animated = true
    await AsyncService.delay(300)
    this.workplace.keyframesThirdGui = 0
    await this.boxWorkplace.doTape()
    this.box.transform = 'translateX(0px) translateY(0px) rotateX(-15deg) rotateY(525deg)'
    this.workplace.keyframesFourGui = 1
    await AsyncService.delay(2100)
    this.workplace.keyframesFourGui = 2
    this.box.animated = false
    this.box.transform = 'translateX(0px) translateY(0px) rotateX(-15deg) rotateY(165deg)'
    this.workplace.stage = 6
  }

  async backToWarping(): Promise<void> {
    this.workplace.stage = 5
    this.workplace.keyframesFourGui = 1
    await this.boxWorkplace.undoTape()
    this.workplace.keyframesFourGui = 0
    this.workplace.keyframesThirdGui = 1
    await AsyncService.delay(300)
    this.workplace.keyframesThirdGui = 2
    this.workplace.stage = 4
  }

  async forwardToWarping() {
    if (this.gifts.length == this.giftsintobox.length) {
      document.querySelector("app-box .side.bottom .skeletonGiftIntoBox.active")?.classList.remove('active')
      this.workplace.activegiftintobox = null

      for (let i = 0; i < this.giftsintobox.length; i++) {
        let under = null
        for (let j = 0; j < this.giftsintobox.length; j++) {
          if (i == j) continue
          if (this.giftsintobox[j].z > this.giftsintobox[i].z && this.intersectionGifts(this.giftsintobox[i], this.giftsintobox[j]) && (under == null || this.giftsintobox[j].z < under.z)) {
            under = this.giftsintobox[j]
          }
        }

        let zh = 0
        if (this.giftsintobox[i].type == 'greetingcard') {
          zh = 2
        } else if (this.giftsintobox[i].type == 'game') {
          zh = 11
        }

        if (under == null) {
          this.giftsintobox[i].z = -zh/2
        } else {

          let underZh = 0
          if (under.type == 'greetingcard') {
            underZh = 2
          } else if (under.type == 'game') {
            underZh = 11
          }

          this.giftsintobox[i].z = under.z-underZh/2-zh/2
        }
      }
      this.workplace.stage = 3
      this.workplace.tool = ''
      this.box.animated = true
      await AsyncService.delay(10)
      this.box.transform = `translateX(0px) translateY(0px) rotateX(-15deg) rotateY(-15deg)`
      this.workplace.keyframesSecondTextGui = 4
      await AsyncService.delay(2000)
      this.workplace.keyframesSecondTextGui = 5
      this.box.unpack = false
      await AsyncService.delay(2000)
      this.workplace.packed = true
      await this.boxWorkplace.doPackage()
      this.box.transform = `translateX(0px) translateY(0px) rotateX(-15deg) rotateY(165deg)`
      this.workplace.keyframesThirdGui = 1
      await AsyncService.delay(2200)
      this.workplace.stage = 4
      this.box.animated = false
      await AsyncService.delay(100)
      // this.box.transform = `translateX(0px) translateY(0px) rotateX(-15deg) rotateY(-15deg)`
      this.workplace.keyframesThirdGui = 2
    }
  }

  async backToIntoGifts(): Promise<void> {
    this.box.animated = true
    this.workplace.stage = 3
    this.workplace.keyframesThirdGui = 1
    await this.boxWorkplace.undoPackage()
    this.workplace.keyframesThirdGui = 0
    this.box.unpack = true
    this.workplace.packed = false
    await AsyncService.delay(300)
    this.workplace.keyframesSecondTextGui = 4
    this.box.transform = `translateX(0px) translateY(0px) rotateX(-90deg) rotateY(0deg)`
    await AsyncService.delay(2000)
    this.box.animated = false
    this.workplace.keyframesSecondTextGui = 3
    this.workplace.stage = 2
  }

  startMoveWorkplace(e: any): void {
    let workplace = e.target
    let reset = true
    while (1) {
      if (workplace.classList[0] == 'workplace' || workplace.tagName == 'BODY') break
      if (workplace.classList[0] == 'skeletonGiftIntoBox' || workplace.classList[0] == 'additButton') reset = false
      workplace = workplace.parentNode
    }
    if (reset) {
      workplace.querySelector("app-box .side.bottom .skeletonGiftIntoBox.active")?.classList.remove('active')
      this.workplace.activegiftintobox = null
    }
    if (workplace.querySelector("app-box .side.bottom .skeletonGiftIntoBox.active")) return
    if (this.workplace.tool != "move") return
    if (this.isTouch && !e.touches) return
    if (!this.isTouch && e.touches) return
    if (this.isTouch && e.touches.length != 1) return

    let x = 0
    let y = 0
    if (this.isTouch) {
      x = e.touches[0].clientX
      y = e.touches[0].clientY
    } else if (!this.isTouch) {
      x = e.clientX
      y = e.clientY
    }
    this.workplace.start = [x, y]
    this.workplace.translateDynamic = [this.workplace.translateStatic[0], this.workplace.translateStatic[1]]
    this.workplace.canmove = true
  }
  moveWorkplace(e: any): void {
    if (this.workplace.tool != "move") return
    if (this.isTouch && !e.touches) return
    if (!this.isTouch && e.touches) return
    if (this.isTouch && e.touches.length != 1) return
    if (!this.workplace.canmove) return

    let x = 0
    let y = 0
    if (this.isTouch) {
      x = e.touches[0].clientX
      y = e.touches[0].clientY
    } else if (!this.isTouch) {
      x = e.clientX
      y = e.clientY
    }
    x = x-this.workplace.start[0]
    y = y-this.workplace.start[1]
    this.workplace.translateDynamic = [this.workplace.translateStatic[0]+x, this.workplace.translateStatic[1]+y]
    if (this.workplace.translateDynamic[0] < -1.5*this.box.size.x-this.box.size.y-window.innerWidth/2) {
      this.workplace.translateDynamic[0] = -1.5*this.box.size.x-this.box.size.y-window.innerWidth/2
    } else if (this.workplace.translateDynamic[0] > this.box.size.x/2+this.box.size.y+window.innerWidth/2) {
      this.workplace.translateDynamic[0] = this.box.size.x/2+this.box.size.y+window.innerWidth/2
    }
    if (this.workplace.translateDynamic[1] < -this.box.size.z/2-this.box.size.y-window.innerHeight/2) {
      this.workplace.translateDynamic[1] = -this.box.size.z/2-this.box.size.y-window.innerHeight/2
    } else if (this.workplace.translateDynamic[1] > this.box.size.z/2+this.box.size.y+window.innerHeight/2) {
      this.workplace.translateDynamic[1] = this.box.size.z/2+this.box.size.y+window.innerHeight/2
    }

    this.box.transform = 'translateX('+this.workplace.translateDynamic[0]+'px) translateY('+this.workplace.translateDynamic[1]+'px) rotateX(-90deg)'
  }
  endMoveWorkplace(e: any): void {
    if (this.workplace.tool != "move") return
    if (this.isTouch && !e.changedTouches) return
    if (!this.isTouch && e.changedTouches) return
    if (this.isTouch && e.changedTouches.length != 1) return
    if (!this.workplace.canmove) return
    this.workplace.start = [0, 0]
    this.workplace.translateStatic = [this.workplace.translateDynamic[0], this.workplace.translateDynamic[1]]
    this.workplace.translateDynamic = [0, 0]
    this.workplace.canmove = false

  }

  dbltouchWorkplace(e: any) {
    if (this.workplace.stage == 0) {
      if (this.isTouch && e.changedTouches.length != 1) return
      if (!this.contextWorkplace.can) return
      const x = this.isTouch ? e.changedTouches[0].clientX : e.clientX
      const y = this.isTouch ? e.changedTouches[0].clientY : e.clientY

      setTimeout(() => {
        this.contextWorkplace.x = x
        this.contextWorkplace.y = y
        this.contextWorkplace.show = true
        this.contextWorkplace.can = false
      }, 300)
    } else if (this.workplace.stage == 2) {
      if (!this.isTouch || (this.isTouch && e.changedTouches.length != 1)) return
      if (e.target.classList[0] == 'additButton') return
      this.showlistgifts()
    } else if (this.workplace.stage == 4) {
      if (!this.isTouch || (this.isTouch && e.changedTouches.length != 1)) return
      this.showlistwrapping()
    } else if (this.workplace.stage == 6) {
      if (!this.isTouch || (this.isTouch && e.changedTouches.length != 1)) return
      this.showlisttape()
    }
  }

  showlistwrapping(): void {
    this.workplace.showlistwraping = true
  }

  chooseWrap(e: any): void {
    this.box.package = e
    this.workplace.showlistwraping = false

    this.save()
  }

  cancelWrap(): void {
    this.workplace.showlistwraping = false
  }

  showlisttape(): void {
    this.workplace.showlisttape = true
  }

  chooseTape(e: any): void {
    this.box.tape = e
    this.workplace.showlisttape = false

    this.save()
  }

  cancelTape(): void {
    this.workplace.showlisttape = false
  }

  startFocusSkeletonGift(e: any, id: number): void {
    if (this.isTouch && !e.touches) return
    if (!this.isTouch && e.touches) return
    this.workplace.canmovegiftintobox = true
  }

  moveFocusSkeletonGift(e: any, id: number): void {
    if (this.isTouch && !e.touches) return
    if (!this.isTouch && e.touches) return
    if (!this.workplace.canmovegiftintobox) return
    if (this.workplace.activegiftintobox?.id != id) return

    this.workplace.wasmoveintobox = true

    let x = 0, y = 0
    if (this.isTouch) {
      x = e.touches[0].clientX-window.innerWidth/2
      y = e.touches[0].clientY-window.innerHeight/2
    } else {
      x = e.clientX-window.innerWidth/2
      y = e.clientY-window.innerHeight/2
    }

    let gift = null
    for (let i = 0; i < this.giftsintobox.length; i++) {
      if (this.giftsintobox[i].id == id) {
        gift = this.giftsintobox[i]
        break
      }
    }

    let trnsX = parseInt(this.box.transform.match(/translateX\(\-?[0-9]+px\)/) ? this.box.transform.match(/translateX\(\-?[0-9]+px\)/)[0].slice(11, -3) : 0)
    let trnsY = parseInt(this.box.transform.match(/translateY\(\-?[0-9]+px\)/) ? this.box.transform.match(/translateY\(\-?[0-9]+px\)/)[0].slice(11, -3) : 0)

    gift.x = x-trnsX
    gift.y = -y+trnsY

    this.correctEdgesIntoBox()

  }

  deleteGiftIntoBoxById(id: number): void {
    let z = 0
    for (let i = 0; i < this.giftsintobox.length; i++) {
      if (this.giftsintobox[i].id == id) {
        z = this.giftsintobox[i].z
        this.giftsintobox.splice(i, 1)
        break
      }
    }
    for (let i = 0; i < this.giftsintobox.length; i++) {
      if (this.giftsintobox[i].z < z) {
        this.giftsintobox[i].z += 20
      }
    }
    this.workplace.activegiftintobox = null

    if (this.workplace.showgiftlist) {
      this.workplace.showgiftlist = false
    }

    this.save()
  }

  correctEdgesIntoBox(): void {
    let gift = this.workplace.activegiftintobox
    if (gift.rotate == 0 || gift.rotate == 180) {
      if (gift.x < -this.box.size.x/2+gift.w/2) gift.x = -this.box.size.x/2+gift.w/2
      if (gift.x > this.box.size.x/2-gift.w/2) gift.x = this.box.size.x/2-gift.w/2
      if (gift.y < -this.box.size.z/2+gift.h/2) gift.y = -this.box.size.z/2+gift.h/2
      if (gift.y > this.box.size.z/2-gift.h/2) gift.y = this.box.size.z/2-gift.h/2
    } else if (gift.rotate == 90 || gift.rotate == 270) {
      if (gift.x < -this.box.size.x/2+gift.h/2) gift.x = -this.box.size.x/2+gift.h/2
      if (gift.x > this.box.size.x/2-gift.h/2) gift.x = this.box.size.x/2-gift.h/2
      if (gift.y < -this.box.size.z/2+gift.w/2) gift.y = -this.box.size.z/2+gift.w/2
      if (gift.y > this.box.size.z/2-gift.w/2) gift.y = this.box.size.z/2-gift.w/2
    }
  }

  endFocusSkeletonGift(e: any, id: number): void {
    if (this.isTouch && !e.changedTouches) return
    if (!this.isTouch && e.changedTouches) return

    this.workplace.canmovegiftintobox = false

    if (!this.workplace.wasmoveintobox && this.workplace.stage == 2) {
      this.chooseSkeletonGift(e, id)
    }
    this.workplace.wasmoveintobox = false

    this.save()
  }

  chooseSkeletonGift(e: any, id: number): void {
    let el = e.target
    while (1) {
      if (el.tagName == 'BODY') return
      if (el.classList[0] == 'skeletonGiftIntoBox') break
      el = el.parentNode
    }
    let skeletons = el.parentNode.querySelectorAll('.skeletonGiftIntoBox')
    for (let i = 0; i < skeletons.length; i++) {
      skeletons[i].classList.remove('active')
    }
    if (this.workplace.activegiftintobox?.id == id) {
      el.classList.remove('active')
      this.workplace.activegiftintobox = null
    } else {
      el.classList.add('active')
      for (let i = 0; i < this.giftsintobox.length; i++) {
        if (this.giftsintobox[i].id == id) {
          this.workplace.activegiftintobox = this.giftsintobox[i]
          break;
        }
      }
    }
  }

  get transAdditLeftWorkplaceX(): number {
    let halfw = 0
    if (this.workplace.activegiftintobox.rotate == 0 || this.workplace.activegiftintobox.rotate == 180) {
      halfw = (this.workplace.activegiftintobox.w+20)/2
    } else if (this.workplace.activegiftintobox.rotate == 90 || this.workplace.activegiftintobox.rotate == 270) {
      halfw = (this.workplace.activegiftintobox.h+20)/2
    }
    return this.workplace.activegiftintobox.x-halfw+20-3
  }
  get transAdditLeftWorkplaceY(): number {
    let halfh = 0
    if (this.workplace.activegiftintobox.rotate == 0 || this.workplace.activegiftintobox.rotate == 180) {
      halfh = (this.workplace.activegiftintobox.h+20)/2
    } else if (this.workplace.activegiftintobox.rotate == 90 || this.workplace.activegiftintobox.rotate == 270) {
      halfh = (this.workplace.activegiftintobox.w+20)/2
    }
    return -this.workplace.activegiftintobox.y-halfh-20
  }
  get transAdditRightWorkplaceX(): number {
    let halfw = 0
    if (this.workplace.activegiftintobox.rotate == 0 || this.workplace.activegiftintobox.rotate == 180) {
      halfw = (this.workplace.activegiftintobox.w+20)/2
    } else if (this.workplace.activegiftintobox.rotate == 90 || this.workplace.activegiftintobox.rotate == 270) {
      halfw = (this.workplace.activegiftintobox.h+20)/2
    }
    return this.workplace.activegiftintobox.x+halfw-20+3
  }
  get transAdditRightWorkplaceY(): number {
    let halfh = 0
    if (this.workplace.activegiftintobox.rotate == 0 || this.workplace.activegiftintobox.rotate == 180) {
      halfh = (this.workplace.activegiftintobox.h+20)/2
    } else if (this.workplace.activegiftintobox.rotate == 90 || this.workplace.activegiftintobox.rotate == 270) {
      halfh = (this.workplace.activegiftintobox.w+20)/2
    }
    return -this.workplace.activegiftintobox.y-halfh-20
  }

  rotateGiftIntoBox(e: any): void {
    this.workplace.activegiftintobox.rotate += 90
    if (this.workplace.activegiftintobox.rotate == 360) this.workplace.activegiftintobox.rotate = 0

    this.correctEdgesIntoBox()

    this.save()
  }

  showlistgifts(): void {
    this.workplace.showgiftlist = true
  }

  closelistgifts(): void {
    this.workplace.showgiftlist = false
  }

  chooselistgifts(e: any): void {
    this.workplace.showgiftlist = false
    let exists = false
    for (let i = 0; i < this.giftsintobox.length; i++) {
      if (this.giftsintobox[i].id == e.id) {
        exists = true
        break
      }
    }
    if (!exists) {
      e.x = 0
      e.y = 0
      e.z = -(this.giftsintobox.length+1)*20
      e.rotate = 0
      if (e.type == 'greetingcard') {
        e.w = 80
        e.h = e.w/(100/150)
      } else if (e.type == 'game') {
        e.w = 100
        e.h = e.w/(135/190)
      }
      this.giftsintobox.push(e)
    }

    this.save()
  }

  async actShowBucks(): Promise<void> {
    this.transformFullsreen = "translateY(100%)"
    this.showbucks = true
    this.refreshable(false)
  }

  async backFromBucks(): Promise<void> {
    this.showbucks = false
    this.transformFullsreen = "translateY(0%)"
    this.refreshable(true)
  }

  async forwardToPackage(e: any): Promise<void> {
    this.showbucks = false
    if (!e) {
      this.bucks.exists = false
      this.bucks.exact = false
      this.bucks.value = 0
    } else {
      this.bucks.exists = true
      this.bucks.exact = e[0]
      this.bucks.value = e[1]
    }
    await AsyncService.delay(300)
    this.rack.right = `0%`
    await AsyncService.delay(2000)
    this.rack.click = true
    this.refreshable(true)
    this.save()
  }

  async forwardToWorkplace(): Promise<void> {
    this.workplace.showFirstGui = 0
    this.box.transform = `rotateX(-15deg) rotateY(-15deg)`
    this.rack.right = `-1000%`
    await AsyncService.delay(2000)
    this.workplace.display = `flex`
    this.workplace.showFirstGui = 1
    await AsyncService.delay(100)
    this.workplace.transform = `scale(1)`
    this.box.animated = true
    await AsyncService.delay(300)
    this.box.transform = `rotateX(-15deg) rotateY(345deg)`
    await AsyncService.delay(2000)
    await AsyncService.delay(10)
    this.box.animated = false
    this.box.transform = `rotateX(-15deg) rotateY(-15deg)`
    await AsyncService.delay(100)
    this.box.animated = true
    await AsyncService.delay(10)
    this.box.transform = `rotateX(-90deg) rotateY(0deg)`
    await AsyncService.delay(2000)
    this.workplace.showFirstGui = 2
    this.box.animated = false
    await AsyncService.delay(300)
    this.workplace.showcanvas = true
    this.refreshable(false)
    this.workplace.stage = 0
  }

  async backToDrawing(): Promise<void> {
    this.workplace.stage = 1
    this.box.animated = true
    this.giftsintobox = []
    await AsyncService.delay(10)
    this.workplace.keyframesSecondTextGui = 1
    await AsyncService.delay(300)
    this.workplace.keyframesSecondTextGui = 0
    await AsyncService.delay(300)
    this.workplace.showFirstGui = 1
    await AsyncService.delay(300)
    this.workplace.showFirstGui = 2
    this.workplace.showcanvas = true
    this.workplace.imgBox = ""
    this.box.animated = false
    this.workplace.stage = 0
    this.workplace.tool = "pen"
  }

  async backToGifts(): Promise<void> {
    this.workplace.showcanvas = false
    this.workplace.showFirstGui = 1
    this.workplace.transform = `scale(0)`
    await AsyncService.delay(300)
    this.workplace.showFirstGui = 0
    this.workplace.display = `none`
    await AsyncService.delay(10)
    // this.showbucks = true
    this.actShowBucks()
  }

  rgbStringToHexString(rgb: any) {
    rgb = rgb.slice(4, -1).split(', ')
    for (let i = 0; i < rgb.length; i++) {
      rgb[i] = parseInt(rgb[i])
    }
    rgb = (rgb[0] << 16) | (rgb[1] << 8) | (rgb[2] << 0)
    return '#' + (0x1000000 + rgb).toString(16).slice(1)
  }

  setOptionPlatformGame(e: any) {
    let el: any = null
    let options: any = []
    if (e.target.classList[0] != "optionPlatformGame") {
      el = e.target.parentNode
      options = e.target.parentNode.parentNode.querySelectorAll(".optionPlatformGame")
    } else {
      el = e.target
      options = e.target.parentNode.querySelectorAll(".optionPlatformGame")
    }
    for (let i = 0; i < options.length; i++) {
      options[i].classList.remove("checked")
    }
    el.classList.add("checked")
  }

  saveOptionPlatformGame() {
    let option = this.listEditingPlatformGame.el.querySelector(".optionPlatformGame.checked")
    this.edititngGift.platform = option.getAttribute('value')

    if (this.edititngGift.platform == "playstation") {
      this.edititngGift.color = '#006FCD'
      this.edititngGift.leftimg = '../../assets/game/psleft.png'
      this.edititngGift.wrap = '../../assets/game/ps.png'
    } else if (this.edititngGift.platform == "xbox") {
      this.edititngGift.color = '#107C10'
      this.edititngGift.leftimg = '../../assets/game/xboxleft.png'
      this.edititngGift.wrap = '../../assets/game/xbox.png'
    } else if (this.edititngGift.platform == "steam") {
      this.edititngGift.color = '#30537e'
      this.edititngGift.leftimg = '../../assets/game/steamleft.png'
      this.edititngGift.wrap = '../../assets/game/steam.png'
    } else if (this.edititngGift.platform == "other") {
      this.edititngGift.color = '#ff5722'
      this.edititngGift.leftimg = '../../assets/game/gameleft.png'
      this.edititngGift.wrap = '../../assets/game/game.png'
    } else if (this.edititngGift.platform == "custom") {
      this.edititngGift.color = '#999'
      this.edititngGift.leftimg = '../../assets/game/gameleft.png'
      this.edititngGift.wrap = '../../assets/game/game.png'
      this.croppingobjectwrapgame.setImage('../../assets/game/game.png')
    }
    this.save()
  }

  chooseGift(id: number): void {
    let el = this.el.querySelector(`.optionGift[idgift='${id}']`)
    let options = this.el.querySelectorAll('.optionGift')
    for (let option of options) { option.classList.remove('choosenGift') }
    el.classList.add('choosenGift')
  }

  setColorPenSignGreeting(e: any) {
    if (e.target) {
      e.target.parentNode.querySelector(".labelcolorpickersigngreeting").style.backgroundColor = e.target.value
    }
  }

  setColorTitleGreeting(e: any) {
    if (e.target) {
      e.target.parentNode.querySelector(".labelcolorpickersigngreeting").style.backgroundColor = e.target.value
    }
  }

  setColorGame(e: any) {
    if (e.target) {
      e.target.parentNode.querySelector(".labelcolorpickersigngreeting").style.backgroundColor = e.target.value
    }
  }

  saveDrawingSignColorGreeting(): void {
    this.sizeforsigngreeting.color = this.drawsigncolorpickgreetingpopup.el.querySelector(".skeletonColorpickerDrawSignGreeting .labelcolorpickersigngreeting").style.backgroundColor
  }
  cancelDrawingSignColorGreeting(): void {
    this.drawsigncolorpickgreetingpopup.el.querySelector(".skeletonColorpickerDrawSignGreeting .labelcolorpickersigngreeting").style.backgroundColor = this.sizeforsigngreeting.color
  }

  saveTitleColorGreeting(): void {
    this.edititngGift.colorText = this.rgbStringToHexString(this.editingtextcolor.el.querySelector(".skeletonColorpickerDrawSignGreeting .labelcolorpickersigngreeting").style.backgroundColor)
    this.editgreetingcard.setTextColor(this.edititngGift.colorText)
    this.save()
  }
  cancelTitleColorGreeting(): void {
    this.editingtextcolor.el.querySelector(".skeletonColorpickerDrawSignGreeting .labelcolorpickersigngreeting").style.backgroundColor = this.edititngGift.colorText
  }

  saveColorGame(): void {
    this.edititngGift.color = this.rgbStringToHexString(this.editingcolorgame.el.querySelector(".skeletonColorpickerDrawSignGreeting .labelcolorpickersigngreeting").style.backgroundColor)
    this.save()
  }
  cancelColorGame(): void {
    this.editingcolorgame.el.querySelector(".skeletonColorpickerDrawSignGreeting .labelcolorpickersigngreeting").style.backgroundColor = this.edititngGift.color
  }

  switchtool(): void {
    if (this.sizeforsigngreeting.tool == "pen") {
      this.sizeforsigngreeting.tool = "eraser"
      this.erasebuttonsigngreeting.el.style.outline = "5px solid #008697"
    } else if (this.sizeforsigngreeting.tool == "eraser") {
      this.sizeforsigngreeting.tool = "pen"
      this.erasebuttonsigngreeting.el.style.outline = "0px solid #008697"
    }
  }

  setSizesDemoSlider(): void {
    this.slideradd.setSizes();
  }

  saveDrawingSignGreeting(): void {
    let img = this.drawingobjectsigngreeting.getImage()
    this.editgreetingcard.setSign(img)
    this.edititngGift.sign = img
    this.save()
  }

  setSizesListGifts(): void {
    for (let i = 0; i < this.gifts.length; i++) {
      if (this.gifts[i].type == 'greetingcard') {
      }
    }
  }

  deleteGift(e: any, id: Number) {
    let bounding = e.target.parentNode
    bounding.style.transform = 'scale(0) rotate(180deg)'
    setTimeout(() => {
      for (let i = 0; i < this.gifts.length; i++) {
        if (id == this.gifts[i].id) {
          this.gifts.splice(i, 1)
          break
        }
      }
      this.save()
    }, 300)
  }

  openEditGift(e: any, id: Number) {
    let gift = null
    for (let i = 0; i < this.gifts.length; i++) {
      if (id == this.gifts[i].id) {
        gift = this.gifts[i]
        break
      }
    }
    this.edititngGift = gift
    if (gift.type == 'greetingcard') {
      this.editgreetingcard.setFront(this.edititngGift.front)
      this.editgreetingcard.setBack(this.edititngGift.back)
      this.editgreetingcard.setText(this.edititngGift.text)
      this.editgreetingcard.setSign(this.edititngGift.sign)
      this.drawingobjectsigngreeting.setSign(this.edititngGift.sign)

      this.editgreetingpopup.show(e.clientX, e.clientY)

      this.editgreetingcard.setTextColor(this.edititngGift.colorText)

      this.croppingobjectfrontgreeting.setRation(100/150)
      this.croppingobjectbackgreeting.setRation(100/100)
      setTimeout(() => {
        this.listEditGreeting.scrollToStart()
        this.croppingobjectfrontgreeting.setImage(this.edititngGift.front)
        this.croppingobjectbackgreeting.setImage(this.edititngGift.back)
      }, 300);
    } else if (gift.type == 'game') {
      this.editgamepopup.show(e.clientX, e.clientY)

      this.croppingobjectfrontgame.setRation(135/(190-2*135*0.1))
      this.croppingobjectwrapgame.setRation(100/100)
      setTimeout(() => {
        this.listEditGame.scrollToStart()
        this.croppingobjectfrontgame.setImage(this.edititngGift.img)
        this.croppingobjectwrapgame.setImage(this.edititngGift.wrap)
      }, 300);
    }
  }

  setSizesEditDemo(): void {
    let bounding = this.editgreetingcard.el.parentNode.getBoundingClientRect()
    this.editgreetingcard.setSize((2/3)*bounding.height*0.9, bounding.height*0.9, 2)
    this.editgreetingcard.demoAnimate(true)
    this.editgreetingcard.setText()
  }

  setTitleGift(): void {
    this.edititngGift.title = this.texttitle.value
    this.save()
  }

  setTitleGiftGame(): void {
    this.edititngGift.title = this.texttitlegame.value
    this.save()
  }

  setCodeGiftGame(): void {
    this.edititngGift.code = this.textcodegame.value
    this.save()
  }

  setTextGreeting(): void {
    this.edititngGift.text = this.textareaTextGreeting.value.replace(/\n/g, `<br>`)
    this.editgreetingcard.setText(this.textareaTextGreeting.value.replace(/\n/g, `<br>`))
    this.save()
  }

  setDefaultCropping(): void {
    let url = this.skeletonArrayFrontImages.nativeElement.querySelector('app-image-list-array.check').getAttribute('img')
    this.croppingobjectfrontgreeting.setImage(url)
  }

  setDefaultBackCropping(): void {
    let url = this.skeletonArrayBackImages.nativeElement.querySelector('app-image-list-array.check').getAttribute('img')
    this.croppingobjectbackgreeting.setImage(url);
  }

  saveCroppingFront(): void {
    this.croppingobjectfrontgreeting.getImage().then((img: any) => {
      this.edititngGift.front = img
      this.editgreetingcard.setFront(img)
      this.croppingfrontgreeting.hideNoAnim()
      this.editgreetingpopup.showNoAnim()
      this.editoptionfront.setValue('custom')
      this.save()
    })
  }

  saveCroppingFrontGame(): void {
    this.croppingobjectfrontgame.getImage().then((img: any) => {
      this.edititngGift.img = img
      this.croppingfrontgame.hideNoAnim()
      this.editgamepopup.showNoAnim()
      this.save()
    })
  }

  saveCroppingWrapGame(): void {
    this.croppingobjectwrapgame.getImage().then((img: any) => {
      this.edititngGift.wrap = img
      this.croppingwrapgame.hideNoAnim()
      this.editgamepopup.showNoAnim()
      this.save()
    })
  }

  saveCroppingFrontGameDefault(): void {
    this.edititngGift.img = '../../assets/game/anygame.png'
    this.croppingobjectfrontgame.setImage('../../assets/game/anygame.png')
    this.croppingfrontgame.hideNoAnim()
    this.editgamepopup.showNoAnim()
    this.save()
  }

  saveCroppingWrapGameDefault(): void {
    this.edititngGift.wrap = '../../assets/game/game.png'
    this.croppingobjectwrapgame.setImage('../../assets/game/game.png')
    this.croppingwrapgame.hideNoAnim()
    this.editgamepopup.showNoAnim()
    this.save()
  }

  saveCroppingBack(): void {
    this.croppingobjectbackgreeting.getImage().then((img: any) => {
      this.edititngGift.back = img
      this.editgreetingcard.setBack(img)
      this.croppingbackgreeting.hideNoAnim()
      this.editgreetingpopup.showNoAnim()
      this.editoptionback.setValue('custom')
      this.save()
    })
  }

  localUpload(e: any, forwhat: number): void {
    let err: any = []
    let file = e.target.files[0]
    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      e.target.parentNode.querySelector('.errorTextUpload').innerHTML = 'The image must be in png or jpeg format only.'
      return
    }
    let texterr = ''
    if (file.size/(1024**2) > 5) {
      err.push('size must be less than 5MB')
    }
    let fr = new FileReader
    fr.onload = () => {
      let img: any = new Image
      img.onload = () => {
        if (forwhat == 1 || forwhat == 3) {
          if (img.width < 500) {
            err.push('width must be at least 500px')
          }
          if (img.height < 500) {
            err.push('height must be at least 500px')
          }
        } else if (forwhat == 2 || forwhat == 4) {
          if (img.width < 50) {
            err.push('width must be at least 50px')
          }
          if (img.height < 50) {
            err.push('height must be at least 50px')
          }
        }

        if (err.length == 1) {
          e.target.parentNode.querySelector('.errorTextUpload').innerHTML = err[0]
        } else if (err.length > 1) {
          let text = ''
          for (let i = 0; i < err.length; i++) {
            text += `<br>${i+1}. ${err[i]}</li>`
          }
          e.target.parentNode.querySelector('.errorTextUpload').innerHTML = `The picture does not match the following parameters:${text}`
        } else if (err.length == 0) {
          e.target.parentNode.querySelector('.errorTextUpload').innerHTML = ''
          if (forwhat == 1) {
            this.croppingobjectfrontgreeting.setImage(fr.result)
            this.uploadfrontgreetingpopup.hideNoAnim()
            this.croppingfrontgreeting.showNoAnim()
          } else if (forwhat == 2) {
            this.croppingobjectbackgreeting.setImage(fr.result)
            this.uploadbackgreetingpopup.hideNoAnim()
            this.croppingbackgreeting.showNoAnim()
          } else if (forwhat == 3) {
            this.croppingobjectfrontgame.setImage(fr.result)
            this.uploadfrontgamepopup.hideNoAnim()
            this.croppingfrontgame.showNoAnim()
          } else if (forwhat == 4) {
            this.croppingobjectwrapgame.setImage(fr.result)
            this.uploadwrapgamepopup.hideNoAnim()
            this.croppingwrapgame.showNoAnim()
          }
        }
      }
      img.src = fr.result
    }
    fr.readAsDataURL(file)
  }

  showUrlUpload(e: any): void {
    e.target.classList.add('active')
    e.target.parentNode.querySelector('.tabUpload:nth-child(2)').classList.remove('active')
    e.target.parentNode.parentNode.querySelector('.inputLinkUpload').classList.remove('hide')
    e.target.parentNode.parentNode.querySelector('.buttonLinkUpload').classList.remove('hide')
    e.target.parentNode.parentNode.querySelector('.labelFileUpload').classList.add('hide')
  }
  showLocalUpload(e: any): void {
    e.target.classList.add('active')
    e.target.parentNode.querySelector('.tabUpload:nth-child(1)').classList.remove('active')
    e.target.parentNode.parentNode.querySelector('.inputLinkUpload').classList.add('hide')
    e.target.parentNode.parentNode.querySelector('.buttonLinkUpload').classList.add('hide')
    e.target.parentNode.parentNode.querySelector('.labelFileUpload').classList.remove('hide')
  }

  chooseFrontImage(): void {
    let chekmarks = this.skeletonArrayFrontImages.nativeElement.querySelectorAll('app-image-list-array')
    for (let i = 0; i < chekmarks.length; i++) {
      if (chekmarks[i] == event?.target) {
        chekmarks[i].classList.add('check')
      } else {
        chekmarks[i].classList.remove('check')
      }
    }
  }

  chooseBackImage(): void {
    let chekmarks = this.skeletonArrayBackImages.nativeElement.querySelectorAll('app-image-list-array')
    for (let i = 0; i < chekmarks.length; i++) {
      if (chekmarks[i] == event?.target) {
        chekmarks[i].classList.add('check')
      } else {
        chekmarks[i].classList.remove('check')
      }
    }
  }

  async makeChooseReady(type: string): Promise<void> {
    if (type == 'back') {
      this.readyblock.show = false
      this.workplace.display = 'flex'
      await AsyncService.delay(1000)
      this.workplace.transform = 'scale(1)'
      await AsyncService.delay(300)
    } else if (type == 'demo') {
      this.router.navigate(['gift', {demo: true}])
    } else if (type == 'payment') {
      this.router.navigate(['payment'])
    }
    return new Promise(res => res())
  }

  setSizeGreetingForSign(): void {
    let bounding = this.el.querySelector('#skeletonSignGreeting').getBoundingClientRect()
    this.sizeforsigngreeting.w = bounding.width
    this.sizeforsigngreeting.h = bounding.width/(100/150)
    this.sizeforsigngreeting.translateY = -this.sizeforsigngreeting.h*0.4
    this.sizeforsigngreeting.sign = ''
  }

  addGift(type: string): void {
    let maxid = 0;
    for (let i = 0; i < this.gifts.length; i++) {
      if (this.gifts[i].id > maxid) { maxid = this.gifts[i].id }
    }
    let gift: any = {
      id: maxid+1,
      type: type
    }
    this.addpopup.hideNoAnim()
    if (type == 'greetingcard') {
      this.editgreetingcard.setFront('../assets/greetingcard/front/1.jpg')
      this.editgreetingcard.setBack('../assets/greetingcard/back/1.png')
      this.editgreetingcard.setText('May you be gifted with life’s biggest joys and never-ending bliss. After all, you yourself are a gift to earth, so you deserve the best. Happy birthday.')
      this.editgreetingcard.setSign()
      this.drawingobjectsigngreeting.clear()

      gift.title = 'Greeting card'
      gift.front = '../assets/greetingcard/front/1.jpg'
      gift.back = '../assets/greetingcard/back/1.png'
      gift.text = "May you be gifted with life’s biggest joys and never-ending bliss.<br>After all, you yourself are a gift to earth, so you deserve the best.<br>Happy birthday."
      gift.sign = ""
      gift.colorText = "#000"
      this.editgreetingpopup.showNoAnim()
      this.listEditGreeting.scrollToStart()
    } else if (type == 'game') {
      gift.title = 'Game'
      gift.platform = 'playstation'
      gift.color = '#006FCD'
      gift.img = '../../assets/game/anygame.png'
      gift.leftimg = '../../assets/game/psleft.png'
      gift.wrap = '../../assets/game/ps.png'
      gift.code = ''

      this.editgamepopup.showNoAnim()
      this.listEditGame.scrollToStart()
    }
    this.gifts.push(gift)
    this.edititngGift = this.gifts[this.gifts.length-1]
    if (type == 'greetingcard') {
      this.croppingobjectfrontgreeting.setRation(100/150)
      this.croppingobjectbackgreeting.setRation(100/100)
      setTimeout(() => {
        this.croppingobjectfrontgreeting.setImage(this.edititngGift.front)
        this.croppingobjectbackgreeting.setImage(this.edititngGift.back)
      }, 100);
    } else if (type == 'game') {
      this.croppingobjectfrontgame.setRation(135/(190-2*135*0.1))
      this.croppingobjectwrapgame.setRation(100/100)
      setTimeout(() => {
        this.croppingobjectfrontgame.setImage(this.edititngGift.img)
        this.croppingobjectwrapgame.setImage(this.edititngGift.wrap)
      }, 100);
    }

    this.save()
  }

  ngAfterViewInit(): void {

    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    window.addEventListener('resize', () => {
      this.setSizeGreetingForSign()
    })
    // this.addpopup.show(50, 600)
    // setTimeout(() => {
    //   this.addpopup.hide()
    // }, 4000);

    if (!this.cookieService.check('idbox')) {
      this.showRestore = false
    }
  }

}
