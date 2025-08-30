import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from '../core/models/weather.interface';

@Injectable({
  providedIn: 'root'
})
export class Weather {
  
  // private apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=02e6132a1cfadb46f0fb213df70e5d01';
  private http = inject(HttpClient);
  private apiKey = '02e6132a1cfadb46f0fb213df70e5d01';

  getWeather(lat: number, lon: number): Observable<any> {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=es`;
    return this.http.get<WeatherData>(url);
  }
}
