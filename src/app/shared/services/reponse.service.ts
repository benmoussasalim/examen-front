import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Reponse} from "../model/reponse";

@Injectable({
  providedIn: 'root'
})
export class ReponseService {

  private url = environment.apiUrl + '/reponses';

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Reponse[]> {
    return this.http.get<Reponse[]>(this.url);
  }
  public getByQuestion(id: any): Observable<Reponse[]> {
    return this.http.get<Reponse[]>(this.url + '/question/' + id);
  }

  public addReponse(reponses: Reponse[]): Observable<any> {
    return this.http.post<any>(this.url, reponses);
  }
  public deleteReponse(id: Number): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id);
  }
  public updateReponse(reponse: Reponse): Observable<any> {
    return this.http.put<any>(this.url , reponse);
  }
}
