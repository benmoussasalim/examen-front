import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Theme} from "../model/theme";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.apiUrl + '/user';

  constructor(private http: HttpClient) {
  }



  public changePassword(password: any): Observable<any> {
    return this.http.patch<any>(this.url, password);
  }

  upload(formData:any, id:any): Observable<any> {
    return this.http.post(this.url + '/' + id, formData);
  }

  getFiles(id: any): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }
}
