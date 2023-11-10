import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'http://{{host}}/pais';

  constructor(private http: HttpClient) {}

  getCountry(token: string): Observable<any> {
    const url = `${this.apiUrl}/pais/listar?token=${token}`;
    return this.http.get(url)  
  }

  registerCountry(dadosPais: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, dadosPais, { headers });
  } 
}