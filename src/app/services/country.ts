import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Country {
    private apiUrl = 'https://restcountries.com/v3.1/name';

  constructor(private http: HttpClient) {}

  getCountryInfo(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${name}`);
  }
}
