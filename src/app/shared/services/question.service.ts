import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Question} from "../model/question";
import {Examen} from "../model/examen";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private url = environment.apiUrl + '/questions';

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Question[]> {
    return this.http.get<Question[]>(this.url);
  }
  public getByTheme(id: number): Observable<Question[]> {
    return this.http.get<Question[]>(this.url+'/questionbytheme/'+id);
  }
  public addquestion(question: Question): Observable<any> {
    return this.http.post<any>(this.url, question);
  }
  public deletequestion(id: Number): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id);
  }
  public updatequestion(question: Question): Observable<any> {
    return this.http.put<any>(this.url , question);
  }
  public questionById(id: Number):Observable<any>{
    return this.http.get(this.url+"/questionbyid/"+id);
  }
}
