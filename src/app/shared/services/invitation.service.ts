import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Examen} from "../model/examen";

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  private url = environment.apiUrl + '/invitation';

  constructor(private http: HttpClient) {
  }

  public getByCandidat(id: any): Observable<any[]> {
    return this.http.get<any[]>(this.url +'/candidat/'+id);
  }

  public getByEntreprise(id: any): Observable<any[]> {
    return this.http.get<any[]>(this.url +'/entreprise/'+id);
  }
  public addInvit(invitation: any): Observable<any> {
    return this.http.post<any>(this.url, invitation);
  }

}
