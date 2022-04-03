import { Component, OnInit, HostBinding, HostListener } from '@angular/core'
import { TranslateComponent } from '../translate/translate.component'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(
    public trnl: TranslateComponent
  ) { }


  optionsFirst: any = [
    {
      ico: '../../assets/plus.svg',
      text: this.trnl.trnl(['add', 'добавить']),
      value: 'add'
    },
    {
      ico: '../../assets/checkmark.svg',
      text: this.trnl.trnl(['accept', 'готово']),
      value: 'accept'
    }
  ]

  touch: any = {
    start: [0, 0],
    firstmove: true
  }

  disblings: any = {
    menu: false,
    list: false
  }
  showaddlist = ''

  menu: any = {
    status: 'close',
    options: this.optionsFirst
  }

  @HostListener('window:touchstart', ['$event'])
  ontouchstart(e: any): void {
    if (!e.touches || e.touches.length != 1) return

    this.touch.start = [e.touches[0].clientX, e.touches[0].clientY]
  }

  @HostListener('window:touchmove', ['$event'])
  ontouchmove(e: any): void {
    if (!e.touches || e.touches.length != 1) return

    let x = e.touches[0].clientX-this.touch.start[0]
    let y = e.touches[0].clientY-this.touch.start[1]

    if (this.touch.firstmove) {
      if (Math.abs(x) > Math.abs(y)) {
        if (x < 0) {
          this.disblings.list = true
        }
        if (x > 0 && this.menu.status == 'close') {
          this.disblings.menu = true
        }
      } else {
        this.disblings.menu = true
      }
    }
    this.touch.firstmove = false
  }

  @HostListener('window:touchend', ['$event'])
  ontouchend(e: any): void {
    if (!e.changedTouches || e.changedTouches.length != 1) return

    this.disblings.menu = false
    this.disblings.list = false
    this.touch.firstmove = true
  }

  chooseMenu(action: string): void {
    if (action == 'add') {
      this.showaddlist = 'show'
      this.menu.options = []
    }
  }

  getstatusmenu(status: boolean): void {
    if (status) {
      this.menu.status = 'open'
    } else {
      this.menu.status = 'close'
    }
  }

  addGift(type: string): void {

    if (type == 'greetingcard') {
      console.log('greetingcard')
    } else if (type == 'game') {
      console.log('game')
    }

    this.menu.options = this.optionsFirst

    this.showaddlist = ''
  }

  ngOnInit(): void {
    document.body.style.overflow = 'hidden'

    this.trnl.check()
  }

}
