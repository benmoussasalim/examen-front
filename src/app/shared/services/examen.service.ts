import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Examen} from "../model/examen";
import {Question} from "../model/question";

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  private url = environment.apiUrl + '/examens';

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Examen[]> {
    return this.http.get<Examen[]>(this.url);
  }


  public addexamen(examen: Examen): Observable<any> {
    return this.http.post<any>(this.url, examen);
  }
  public deleteexamen(id: Number): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id);
  }
  public updateexamen(examen: Examen): Observable<any> {
    return this.http.put<any>(this.url , examen);
  }
  public examenById(id: Number):Observable<any>{
    return this.http.get(this.url+"/examenbyid/"+id);
  }
  public getByTheme(id: number): Observable<Examen[]> {
    return this.http.get<Examen[]>(this.url+'/examenbytheme/'+id);
  }
  public getByEntreprise(id: number): Observable<Examen[]> {
    return this.http.get<Examen[]>(this.url+'/examenbyentreprise/'+id);
  }
  public getByDateExpiration(date: any): Observable<Examen[]> {
    return this.http.get<Examen[]>(this.url+'/examenbydateexpiration/{date}?date='+date);
  }
  public getNotExpired(filterRequest: any): Observable<any[]> {
    return this.http.post<any[]>(this.url+'/examenNotExpired', filterRequest);
  }
}
