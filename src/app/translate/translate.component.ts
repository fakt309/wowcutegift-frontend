import { Component, OnInit, HostListener } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AsyncService } from '../async.service'

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss']
})
export class TranslateComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public router: Router
  ) { }

  isTouch: boolean = false
  library: Array<string> = ['en', 'ru']
  lang: string = 'en'
  scroll: number = 0

  display: string = 'none'
  opacity: string = 'none'
  transform: string = 'translateY(-50px)'

  dbl: boolean = false
  timeoutdbl: any = setTimeout(() => {}, 0)

  @HostListener('window:touchstart')
  ontouchstart(): void {
    if (this.dbl) {
      this.dodbl()
      this.dbl = false
    } else {
      this.dbl = true
      clearTimeout(this.timeoutdbl)
      this.timeoutdbl = setTimeout(() => {
        this.dbl = false
      }, 200)
    }
  }

  dodbl(): void {
    if (this.display == 'none') this.show()
  }

  trnl(texts: Array<string>): string {
    let lang = this.getlang()
    if (lang == 'unknown') lang = 'en'
    for (let i = 0; i < this.library.length; i++) {
      if (this.library[i] == lang) {
        return texts[i]
      }
    }
    return texts[0]
  }

  async show(): Promise<void> {
    await AsyncService.delay(100)
    this.display = 'flex'
    await AsyncService.delay(10)
    this.scroll = window.innerHeight
    await AsyncService.delay(10)
    this.opacity = '1'
    this.transform = 'translateY(0px)'
    await AsyncService.delay(300)
    return new Promise(res => res())
  }

  async hide(): Promise<void> {
    this.opacity = '0'
    this.transform = 'translateY(-50px)'
    await AsyncService.delay(300)
    this.display = 'none'
    await AsyncService.delay(10)
    return new Promise(res => res())
  }

  getlang(): string {
    let query: any = false
    this.route.queryParams.subscribe(params => {
      if (params['lang']) {
        query = params['lang']
      }
    })
    if (query) {
      for (let lang of this.library) {
        if (lang == query) {
          return lang
        }
      }
    }
    return 'unknown'
  }

  setlang(lang: string): void {
    let path = this.route.snapshot.url[0] ? this.route.snapshot.url[0].path : '/'
    let query: any = {}
    this.route.queryParams.subscribe(params => { query = {...params} })
    query.lang = lang
    this.router.navigate([path], { queryParams: query })
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }

  ngOnInit(): void {
    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    this.lang = this.getlang()

    if (this.getlang() == 'unknown') {
      this.setlang('en')
      // this.show()
    }
  }

}
