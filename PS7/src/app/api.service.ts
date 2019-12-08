import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RESULT } from './models/resultModel';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  httpOptions = {
    headers: new HttpHeaders( { 'Content-Type': 'application/json' })
  }
  endpoint = 'http://localhost:3000/ps6';

  constructor(private httpClient: HttpClient) {}

  getWeatherResults(): Observable<RESULT[]> {
    return this.httpClient.get<RESULT[]>(this.endpoint);
  }

  addWeatherData(newWeather: RESULT): Observable<any> {
    return this.httpClient.post(this.endpoint, newWeather, this.httpOptions);
  }
}
