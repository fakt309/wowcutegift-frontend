import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  setBox(query: any): any {
    let headers = new HttpHeaders({'Content-Type' : 'application/json'})
    return this.http.post('/query', JSON.stringify(query), {headers: headers})
  }
}
