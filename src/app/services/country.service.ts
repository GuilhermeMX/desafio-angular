import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'http://localhost:8090/paises';

  constructor(private http: HttpClient) {}

  getCountry(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}