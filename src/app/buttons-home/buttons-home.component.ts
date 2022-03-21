import { Component, OnInit, Input, SimpleChanges, HostBinding } from '@angular/core'
import { Router } from '@angular/router'
import { AsyncService } from '../async.service'

@Component({
  selector: 'app-buttons-home',
  templateUrl: './buttons-home.component.html',
  styleUrls: ['./buttons-home.component.scss']
})
export class ButtonsHomeComponent implements OnInit {

  constructor(public router: Router,) { }

  @Input('action') action: string = 'none'

  @HostBinding('style.display') display: string = 'none'
  style: any = {
    buttonleft: {
      opacity: '0',
      transform: 'translateY(-50px)'
    },
    buttonright: {
      opacity: '0',
      transform: 'translateY(-50px)'
    }
  }

  async show(): Promise<void> {
    this.display = 'flex'
    await AsyncService.delay(10)
    this.style.buttonleft.opacity = '1'
    this.style.buttonleft.transform = 'translateY(0px)'
    await AsyncService.delay(200)
    this.style.buttonright.opacity = '1'
    this.style.buttonright.transform = 'translateY(0px)'
    return new Promise(res => res())
  }

  async hide(): Promise<void> {
    return new Promise(res => res())
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['action'] && changes['action'].previousValue != changes['action'].currentValue) {
      if (changes['action'].currentValue == 'show') {
        this.show()
      } else if (changes['action'].currentValue == 'hide') {
        this.hide()
      }
    }
  }

}
