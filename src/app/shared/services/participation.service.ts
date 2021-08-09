import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Question} from "../model/question";


@Injectable({
  providedIn: 'root'
})
export class ParticipationService {

  private url = environment.apiUrl + '/participation';

  constructor(private http: HttpClient) {
  }


  public create(idExamen:any, idCandidat: any): Observable<any> {
    return this.http.get<any>(this.url + '/'+ idExamen + '/' + idCandidat);
  }
  public finishParticipation(participation: any): Observable<any>{
    return this.http.patch(this.url+'/finish', participation);
  }
  public getByCandidat(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.url+'/participationbycandidat/'+id);
  }
  public getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.url+'/all');
  }
}
