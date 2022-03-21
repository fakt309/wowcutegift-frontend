import { Component, OnInit, SimpleChanges, Input, HostBinding } from '@angular/core'
import { AsyncService } from '../async.service'

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  constructor() { }

  @Input('value') value: string = ''
  @HostBinding('style.display') display: string = 'none'

  titlereal: string = ''
  scale: number = 0

  async show(): Promise<void> {
    this.display = 'flex'
    await AsyncService.delay(10)
    this.scale = 1
    await AsyncService.delay(300)
    return new Promise(res => res())
  }

  async hide(): Promise<void> {
    this.scale = 0
    await AsyncService.delay(300)
    this.display = 'none'
    return new Promise(res => res())
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && changes['value'].previousValue != changes['value'].currentValue) {
      if (changes['value'].previousValue != "" && changes['value'].currentValue == "") {
        this.hide().then(() => {
          this.titlereal = ""
        })
      } else if (changes['value'].previousValue == "" && changes['value'].currentValue != "") {
        this.titlereal = this.value
        this.show()
      } else if (changes['value'].previousValue != "" && changes['value'].currentValue != "") [
        this.hide().then(() => {
          this.titlereal = this.value
          this.show()
        })
      ]
    }
  }

}
