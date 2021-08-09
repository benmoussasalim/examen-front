import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Theme} from "../model/theme";

@Injectable({
  providedIn: 'root'
})
export class ReponseCandidatService {
  private url = environment.apiUrl + '/reponseCandidat';

  constructor(private http: HttpClient) {
  }
  public save(reponses: any): Observable<any> {
    return this.http.post<any>(this.url, reponses);
  }
  public findByParticipation(idExam: any ,idCandidat: any): Observable<any[]> {
    return this.http.get<any[]>(this.url+ '/' + idExam + '/' + idCandidat);
  }
}
