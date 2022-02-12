import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsyncService {

  constructor() { }

  static delay(ms: number): Promise<void> {
    return new Promise(res => {
      setTimeout(() => { res() }, ms);
    })
  }
}
