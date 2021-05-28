import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Candidat} from "../model/candidat";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.apiUrl + '/login';
  constructor(private http: HttpClient) { }

  public authenticate(loginRequest: any): Observable<any> {
    return this.http.post(this.url, loginRequest);
  }
}
