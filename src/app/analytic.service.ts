import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CookieService } from 'ngx-cookie-service'
import { DatabaseService } from './database.service'
import { TranslateComponent } from './translate/translate.component'
import { AsyncService } from './async.service';

@Injectable({
  providedIn: 'root'
})
export class AnalyticService {

  constructor(
    private cookieService: CookieService,
    private databaseService: DatabaseService,
    private route: ActivatedRoute,
    public trnl: TranslateComponent
  ) { }

  disable(): void {
    this.cookieService.set('analytic', '0', { expires: 180, path: '/' })
  }

  enable(): void {
    this.cookieService.delete('analytic')
  }

  get(): string {
    return this.cookieService.get('analytic')
  }

  async visit(): Promise<any> {
    this.cookieService.set('enablecookie', '1', { expires: 1, path: '/' })
    if (!this.cookieService.check('enablecookie')) return
    await AsyncService.delay(100)
    this.cookieService.delete('enablecookie')

    let id = 'create'
    if (this.cookieService.check('analytic')) {
      id = this.cookieService.get('analytic')
      if (id == '0') return
    }
    let path = window.location.pathname
    let lang = this.trnl.getlang()
    let query = {
      typequery: 'analyticvisit',
      id: id,
      path: path,
      lang: lang
    }
    this.databaseService.setBox(query).subscribe((d: any) => {
      if (d.success) {
        this.cookieService.set('analytic', d.data.id, { expires: 180, path: '/' })
      }
    })
  }

}
