import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Candidat} from "../model/candidat";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url = environment.apiUrl + '/chart';
  constructor(private http: HttpClient) { }

  public getByEntreprise(): Observable<any> {
    return this.http.get(this.url + '/entreprise');
}
  public getByCandidat(): Observable<any> {
    return this.http.get(this.url + '/candidat');
  }
  public getByTheme(): Observable<any> {
    return this.http.get(this.url + '/theme');
  }
  public getByThemeEntreprise(id: any): Observable<any> {
    return this.http.get(this.url + '/theme/'+ id);
  }
  public getByInvitationEntreprise(id: any): Observable<any> {
    return this.http.get(this.url + '/invitation/'+ id);
  }
  public getByMentionEntreprise(id: any): Observable<any> {
    return this.http.get(this.url + '/mention/'+ id);
  }


  public getByInvitationCandidat(id: any): Observable<any> {
    return this.http.get(this.url + '/invitation/candidat/'+ id);
  }
  public getByMentionCandidat(id: any): Observable<any> {
    return this.http.get(this.url + '/mention/candidat/'+ id);
  }
}
