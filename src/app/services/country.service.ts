import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private apiUrl = 'https://api.exemplo.com/paises';

  constructor(private http: HttpClient) {}

  countryRegister(country: any): Observable<any> {
    const url = `${this.apiUrl}/cadastro`;
    return this.http.post(url, country);
  }
}