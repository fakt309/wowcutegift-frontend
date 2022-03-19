import { Component, OnInit, ElementRef } from '@angular/core'
import { Router } from '@angular/router'

import { CookieService } from 'ngx-cookie-service'
import { AsyncService } from '../async.service'
import { DatabaseService } from '../database.service'
import { DeviceInfoService } from '../device-info.service'
import { CryptoService } from '../crypto.service'

@Component({
  selector: 'app-ready-page',
  templateUrl: './ready-page.component.html',
  styleUrls: ['./ready-page.component.scss']
})
export class ReadyPageComponent implements OnInit {

  constructor(
    private host: ElementRef,
    public router: Router,
    private cookieService: CookieService,
    private databaseService: DatabaseService,
    private deviceInfo: DeviceInfoService,
    private crypto: CryptoService
  ) { }

  isTouch: boolean = false

  idbox: string = ''
  preview: any = {
    title: "Gift for you",
    descr: "Look what I have prepared for you",
    img: "/assets/preview.jpg",
    editing: false
  }

  loading: boolean = false

  switchSave(): void {
    if (this.preview.editing) {
      this.preview.title = this.host.nativeElement.querySelector(".chat .message:last-child > .value > .text > .linkblock > .leftlinkblock > .titlelinkblock > .inputTitle").value
      this.preview.descr = this.host.nativeElement.querySelector(".chat .message:last-child > .value > .text > .linkblock > .leftlinkblock > .descrlinkblock > .inputdescrlinkblock").value

      let query = {
        typequery: 'updatepreview',
        id: this.cookieService.get('idbox'),
        data: {
          title: this.preview.title,
          descr: this.preview.descr,
          img: this.preview.img
        }
      }
      this.databaseService.setBox(query).subscribe((d: any) => {
        console.log(d)
      })
    }
    this.preview.editing = !this.preview.editing
  }

  async loadImg(e: any): Promise<void> {
    if (e.target.files[0].size > 1*1024**2) {
      console.log("Image size must be less than 1 MB")
      return
    }
    this.preview.img = await AsyncService.readFile(e.target.files[0])
  }

  async copylink(e: any, link: string): Promise<void> {
    navigator.clipboard.writeText(link)
    e.srcElement.style.animationName = "rotateanim"
    await AsyncService.delay(500)
    e.srcElement.style.animationName = "none"
  }

  ngOnInit(): void {
    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    this.loading = true

    if (this.cookieService.check('idbox')) {
      let query = {
        typequery: 'get',
        id: this.cookieService.get('idbox')
      }
      this.databaseService.setBox(query).subscribe((d: any) => {
        if (d.success) {
          let device = this.deviceInfo.getDeviceInfo()
          let demo = this.crypto.sha256(device.browser+device.browserMajorVersion+device.mobile+device.os+device.osVersion)
          if (demo == d.box.demo) {
            query = {
              typequery: 'undemo',
              id: this.cookieService.get('idbox')
            }
            this.databaseService.setBox(query).subscribe((dd: any) => {
              this.idbox = this.cookieService.get('idbox')
              this.preview.title = d.box.preview.title
              this.preview.descr = d.box.preview.descr
              this.preview.img = d.box.preview.img
              this.loading = false
            })
          } else if (d.box.demo == "") {
            this.idbox = this.cookieService.get('idbox')
            this.preview.title = d.box.preview.title
            this.preview.descr = d.box.preview.descr
            this.preview.img = d.box.preview.img
            this.loading = false
          } else {
            this.router.navigate([''])
          }
        } else {
          this.router.navigate([''])
        }
      })
    } else {
      this.router.navigate([''])
    }

  }

}
