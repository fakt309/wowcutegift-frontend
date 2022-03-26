import { Component, OnInit, Input } from '@angular/core'
import { TranslateComponent } from '../translate/translate.component'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(public trnl: TranslateComponent) { }

  @Input('message') message: number = 0

  ngOnInit(): void {
  }

}
