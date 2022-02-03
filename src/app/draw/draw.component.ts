import { Component, OnInit, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent implements OnInit {

  constructor(private host: ElementRef) { }
  el: any = this.host.nativeElement

  @Input('width') width: number = 0
  @Input('height') height: number = 0
  @Input('color') color: string = '#fff'
  @Input('tool') tool: string = 'pen'

  prev: any = { x: 0, y: 0, ready: false }
  canformouse: boolean = false

  getImage(): any {
    return this.el.querySelector('canvas').toDataURL("image/png");
  }

  clear(): void {
    let cnvs = this.el.querySelector('canvas')
    let ctx = cnvs.getContext('2d')
    ctx.clearRect(0, 0, this.width, this.height);
  }

  ngOnInit(): void {
    this.el.addEventListener('touchmove', (e: any) => {
      let bounding = this.el.querySelector('canvas').getBoundingClientRect()
      let x = e.touches[0].clientX-bounding.x
      let y = e.touches[0].clientY-bounding.y
      let ctx = this.el.querySelector('canvas').getContext('2d')

      if (this.tool == 'pen') {
        if (this.prev.ready) {
          ctx.beginPath()
          ctx.moveTo(this.prev.x, this.prev.y)
          ctx.lineTo(x, y)
          ctx.strokeStyle = this.color
          ctx.lineWidth = 3
          ctx.stroke()
        } else {
          this.prev.ready = true
        }
        this.prev.x = x
        this.prev.y = y
      } else if (this.tool == 'eraser') {
        ctx.clearRect(x, y, 20, 20);
      }
    })
    this.el.addEventListener('touchend', (e: any) => {
      this.prev.ready = false
    })
    this.el.addEventListener('mousedown', (e: any) => {
      this.canformouse = true
    })
    this.el.addEventListener('mousemove', (e: any) => {
      if (!this.canformouse) return

      let bounding = this.el.querySelector('canvas').getBoundingClientRect()
      let x = e.clientX-bounding.x
      let y = e.clientY-bounding.y
      let ctx = this.el.querySelector('canvas').getContext('2d')

      if (this.tool == 'pen') {

        if (this.prev.ready) {
          ctx.beginPath()
          ctx.moveTo(this.prev.x, this.prev.y)
          ctx.lineTo(x, y)
          ctx.strokeStyle = this.color
          ctx.lineWidth = 5
          ctx.stroke()
        } else {
          this.prev.ready = true
        }
        this.prev.x = x
        this.prev.y = y
      } else if (this.tool == 'eraser') {
        ctx.clearRect(x, y, 30, 30);
      }
    })
    this.el.addEventListener('mouseup', (e: any) => {
      this.prev.ready = false
      this.canformouse = false
    })
  }

  ngOnChanges(): void {
  }

}
