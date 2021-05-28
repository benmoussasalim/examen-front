import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Candidat} from "../model/candidat";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
private url = environment.apiUrl + '/register';
  constructor(private http: HttpClient) {
  }
  public registerCandidat(candidat: Candidat): Observable<any> {
    return this.http.post(this.url + '/candidat', candidat);
  }
  public registerEntreprise(entreprise: any): Observable<any> {
    return this.http.post(this.url + '/entreprise', entreprise);
  }
}
