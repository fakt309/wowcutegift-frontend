import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private host: ElementRef) { }
  el: any = this.host.nativeElement
  // minheight: any = "100%"

  ngOnInit(): void {
    // this.minheight = window.innerHeight+'px'
    // window.addEventListener('resize', () => {
    //   this.minheight = window.innerHeight+'px'
    // })
  }


}
