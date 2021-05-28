import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Entreprise} from "../model/entreprise";
import {Candidat} from "../model/candidat";


@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
  private url = environment.apiUrl + '/entreprises';
  constructor(private http: HttpClient) { }
  public getAll(): Observable<Entreprise[]> {
    return this.http.get<Entreprise[]>(this.url);
  }
  public updateEntreprise(Entreprise: Entreprise): Observable<any> {
    return this.http.put(this.url , Entreprise);
  }
  public changeState(entreprise: Entreprise): Observable<any> {
    return this.http.patch(this.url , entreprise);
  }

  public deleteEntreprise(id: number): Observable<any> {
    return this.http.delete(this.url + '/'+ id );
  }

  public findById(id: number): Observable<Entreprise>
  {
    return  this.http.get<Entreprise>(this.url + '/' + id);
  }
  public findByEmail(email: string): Observable<Entreprise>
  {
    return  this.http.get<Entreprise>(this.url + '/email/' + email);
  }
}

