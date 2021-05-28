import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Theme} from "../model/theme";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private url = environment.apiUrl + '/themes';

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Theme[]> {
    return this.http.get<Theme[]>(this.url);
  }

  public addTheme(theme: Theme): Observable<any> {
    return this.http.post<any>(this.url, theme);
  }
  public deleteTheme(id: Number): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id);
  }
  public updateTheme(theme: Theme): Observable<any> {
    return this.http.put<any>(this.url , theme);
  }
}
