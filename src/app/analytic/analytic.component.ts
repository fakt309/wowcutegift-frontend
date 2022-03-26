import { Component, OnInit } from '@angular/core'
import { AnalyticService } from '../analytic.service'

@Component({
  selector: 'app-analytic',
  templateUrl: './analytic.component.html',
  styleUrls: ['./analytic.component.scss']
})
export class AnalyticComponent implements OnInit {

  constructor(private analytic: AnalyticService) { }

  status: string = 'enable'

  switch(): void {
    if (this.analytic.get() == '0') {
      this.analytic.enable()
      this.status = 'enable'
    } else {
      this.analytic.disable()
      this.status = 'disable'
    }
  }

  ngOnInit(): void {
    if (this.analytic.get() == '0') {
      this.status = 'disable'
    } else {
      this.status = 'enable'
    }
  }

}
