import { Component, OnInit, HostListener, HostBinding, Input, SimpleChanges, EventEmitter, Output, ElementRef } from '@angular/core'
import { AsyncService } from '../async.service'
import { TranslateComponent } from '../translate/translate.component'

@Component({
  selector: 'app-list-of-wraps',
  templateUrl: './list-of-wraps.component.html',
  styleUrls: ['./list-of-wraps.component.scss']
})
export class ListOfWrapsComponent implements OnInit {

  constructor(
    private host: ElementRef,
    public trnl: TranslateComponent
  ) { }

  @HostBinding('class.phone') phone: boolean = false
  @HostBinding('class.animate') animate: boolean = false
  @HostBinding('style.display') display: string = 'none'
  @HostBinding('style.backgroundColor') backgroundColor: string = '#ffffff00'

  @Input('show') show: boolean = false

  @Output() choosen = new EventEmitter<string>()
  @Output() cancel = new EventEmitter<void>()

  isTouch: boolean = true

  transform: string = 'translateY(-100vh)'

  cropping: any = {
    show: false,
    image: '',
    refresh: false,
    data: ''
  }

  error: string = ''

  loading: boolean = false

  async doShow(): Promise<void> {
    this.animate = true
    this.display = 'flex'
    await AsyncService.delay(10)
    if (this.isTouch) {
      this.host.nativeElement.querySelector(".content > app-list2").scrollTop = this.host.nativeElement.getBoundingClientRect().height
    }
    await AsyncService.delay(10)
    this.backgroundColor = '#ffffff99'
    this.transform = 'translateY(0vh)'
    await AsyncService.delay(300)
    this.animate = false
    return new Promise(res => res())
  }

  async doHide(): Promise<void> {
    this.animate = true
    await AsyncService.delay(10)
    this.backgroundColor = '#ffffff00'
    this.transform = 'translateY(-100vh)'
    await AsyncService.delay(300)
    this.display = 'none'
    this.animate = false
    return new Promise(res => res())
  }

  openUpload(e: any): void {
    e.target.parentNode.parentNode.querySelector("input[type='file']").click()
  }

  getImage(img: any): void {
    this.cropping.data = img
    this.loading = false
  }

  timeout1: any = setTimeout(() => {}, 0)

  async loadImage(e: any): Promise<void> {
    let img = await AsyncService.readFile(e.srcElement.files[0])
    let meta = await AsyncService.loadImg(img)
    let err = ''
    if (e.srcElement.files[0].type != 'image/jpeg' && e.srcElement.files[0].type != 'image/png') {
      err += this.trnl.trnl(['jpg/png format. ', 'jpg/png формат. '])
    }
    if (e.srcElement.files[0].size/(1024**2) > 5) {
      err += this.trnl.trnl(['Maximum size 5MB. ', 'Максимальный размер 5МБ. '])
    }
    if (meta.naturalWidth < 100 || meta.naturalHeight < 100 || meta.naturalWidth > 2000 || meta.naturalHeight > 2000) {
      err += this.trnl.trnl(['Minimum resolution 100x100 and less then 2000x2000. ', 'Минимальное разрешение 100х100 и максимальное 2000х200. '])
    }
    if (err != '') {
      this.error = err
      clearTimeout(this.timeout1)
      this.timeout1 = setTimeout(() => { this.error = '' }, 5000)
    } else {
      clearTimeout(this.timeout1)
      this.error = ''
      this.cropping.image = await AsyncService.readFile(e.srcElement.files[0])
      this.cropping.refresh = !this.cropping.refresh
      this.cropping.show = true
      // this.choosen.emit(img)
    }
    // this.cropping.image = await AsyncService.readFile(e.srcElement.files[0])
    // this.cropping.refresh = !this.cropping.refresh
    // this.cropping.show = true
    // this.choosen.emit(img)
    return new Promise(res => res())
  }

  cancelCropping(): void {
    this.cropping.show = false
  }

  acceptCropping(): void {
    if (!this.loading) {
      this.cropping.show = false
      this.choosen.emit(this.cropping.data)
    }
  }

  choose(e: any): void {
    let options = e.srcElement.parentNode.querySelectorAll(".option")
    for (let i = 0; i < options.length; i++) { options[i].classList.remove('active') }
    e.srcElement.classList.add('active')
    this.choosen.emit(e.srcElement.style.backgroundImage.slice(5, -2))
  }

  ngOnInit(): void {
    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    if (this.isTouch) this.phone = true
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['show']?.currentValue != changes['show']?.previousValue) {
      if (changes['show'].currentValue) {
        this.doShow()
      } else {
        this.doHide()
      }
    }

  }

}
