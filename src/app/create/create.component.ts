import { Component, AfterViewInit, ElementRef, ViewChild, OnInit, HostListener } from '@angular/core';

import { AsyncService } from "../async.service"

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

  constructor(private host: ElementRef) { }

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

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setSizesDemoSlider()
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

  sizeforsigngreeting: any = { w: 100, h: 150, translateY: 0, sign: 'a', tool: 'pen', color: '#cc0000' }

  showbucks: boolean = false
  transformFullsreen: string = "translateY(0%)"

  async actShowBucks(): Promise<void> {
    this.transformFullsreen = "translateY(100%)"
    this.showbucks = true
  }

  async backFromBucks(): Promise<void> {
    this.showbucks = false
    this.transformFullsreen = "translateY(0%)"
  }

  async forwardToPackage(e: any): Promise<void> {
    console.log(e)
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
  }
  cancelTitleColorGreeting(): void {
    this.editingtextcolor.el.querySelector(".skeletonColorpickerDrawSignGreeting .labelcolorpickersigngreeting").style.backgroundColor = this.edititngGift.colorText
  }

  saveColorGame(): void {
    this.edititngGift.color = this.rgbStringToHexString(this.editingcolorgame.el.querySelector(".skeletonColorpickerDrawSignGreeting .labelcolorpickersigngreeting").style.backgroundColor)
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
    }, 300);
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
      this.editgreetingcard.setFront(this.edititngGift.front.data)
      this.editgreetingcard.setBack(this.edititngGift.back.data)
      this.editgreetingcard.setText(this.edititngGift.front.data.text)
      this.editgreetingcard.setSign(this.edititngGift.sign)
      this.drawingobjectsigngreeting.setSign(this.edititngGift.sign)

      this.editgreetingpopup.show(e.clientX, e.clientY)

      this.editgreetingcard.setTextColor(this.edititngGift.colorText)

      this.croppingobjectfrontgreeting.setRation(100/150)
      this.croppingobjectbackgreeting.setRation(100/100)
      setTimeout(() => {
        this.listEditGreeting.scrollToStart()
        this.croppingobjectfrontgreeting.setImage(this.edititngGift.front.data)
        this.croppingobjectbackgreeting.setImage(this.edititngGift.back.data)
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
  }

  setTitleGiftGame(): void {
    this.edititngGift.title = this.texttitlegame.value
  }

  setCodeGiftGame(): void {
    this.edititngGift.code = this.textcodegame.value
  }

  setTextGreeting(): void {
    this.edititngGift.text = this.textareaTextGreeting.value.replace(/\n/g, `<br>`)
    this.editgreetingcard.setText(this.textareaTextGreeting.value.replace(/\n/g, `<br>`))
  }

  setDefaultCropping(): void {
    let url = this.skeletonArrayFrontImages.nativeElement.querySelector('app-image-list-array.check').getAttribute('img')
    this.croppingobjectfrontgreeting.setImage(url);
  }

  setDefaultBackCropping(): void {
    let url = this.skeletonArrayBackImages.nativeElement.querySelector('app-image-list-array.check').getAttribute('img')
    this.croppingobjectbackgreeting.setImage(url);
  }

  saveCroppingFront(): void {
    this.croppingobjectfrontgreeting.getImage().then((img: any) => {
      this.edititngGift.front.data = img
      this.editgreetingcard.setFront(img)
      this.croppingfrontgreeting.hideNoAnim()
      this.editgreetingpopup.showNoAnim()
      this.editoptionfront.setValue('custom')
    })
  }

  saveCroppingFrontGame(): void {
    this.croppingobjectfrontgame.getImage().then((img: any) => {
      this.edititngGift.img = img
      this.croppingfrontgame.hideNoAnim()
      this.editgamepopup.showNoAnim()
    })
  }

  saveCroppingWrapGame(): void {
    this.croppingobjectwrapgame.getImage().then((img: any) => {
      this.edititngGift.wrap = img
      this.croppingwrapgame.hideNoAnim()
      this.editgamepopup.showNoAnim()
    })
  }

  saveCroppingFrontGameDefault(): void {
    this.edititngGift.img = '../../assets/game/anygame.png'
    this.croppingobjectfrontgame.setImage('../../assets/game/anygame.png')
    this.croppingfrontgame.hideNoAnim()
    this.editgamepopup.showNoAnim()
  }

  saveCroppingWrapGameDefault(): void {
    this.edititngGift.wrap = '../../assets/game/game.png'
    this.croppingobjectwrapgame.setImage('../../assets/game/game.png')
    this.croppingwrapgame.hideNoAnim()
    this.editgamepopup.showNoAnim()
  }

  saveCroppingBack(): void {
    this.croppingobjectbackgreeting.getImage().then((img: any) => {
      this.edititngGift.back.data = img
      this.editgreetingcard.setBack(img)
      this.croppingbackgreeting.hideNoAnim()
      this.editgreetingpopup.showNoAnim()
      this.editoptionback.setValue('custom')
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
    fr.readAsDataURL(file);
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
      gift.front = { data: '../assets/greetingcard/front/1.jpg' }
      gift.back = { data: '../assets/greetingcard/back/1.png' }
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
        this.croppingobjectfrontgreeting.setImage(this.edititngGift.front.data)
        this.croppingobjectbackgreeting.setImage(this.edititngGift.back.data)
      }, 100);
    } else if (type == 'game') {
      this.croppingobjectfrontgame.setRation(135/(190-2*135*0.1))
      this.croppingobjectwrapgame.setRation(100/100)
      setTimeout(() => {
        this.croppingobjectfrontgame.setImage(this.edititngGift.img)
        this.croppingobjectwrapgame.setImage(this.edititngGift.wrap)
      }, 100);
    }
  }

  ngAfterViewInit(): void {

    window.addEventListener('resize', () => {
      this.setSizeGreetingForSign()
    })
    // this.addpopup.show(50, 600)
    // setTimeout(() => {
    //   this.addpopup.hide()
    // }, 4000);
  }

}
