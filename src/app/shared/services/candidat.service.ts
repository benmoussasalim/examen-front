import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Candidat} from "../model/candidat";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CandidatService {
  private url = environment.apiUrl + '/candidats';
  constructor(private http: HttpClient) { }

  public getAll(): Observable<Candidat[]> {
    return this.http.get<Candidat[]>(this.url);
  }
  public updateCandidat(candidat: Candidat): Observable<any> {
    return this.http.put(this.url , candidat);
  }
  public changeState(candidat: Candidat): Observable<any> {
    return this.http.patch(this.url , candidat);
  }

  public deleteCandidat(id: number): Observable<any> {
    return this.http.delete(this.url + '/'+ id );
  }

  public findById(id: number): Observable<Candidat>
  {
    return  this.http.get<Candidat>(this.url + '/' + id);
  }
  public findByEmail(email: string): Observable<Candidat>
  {
    return  this.http.get<Candidat>(this.url + '/email/' + email);
  }
}
