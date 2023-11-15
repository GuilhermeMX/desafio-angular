import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

interface AuthResponse {
  token: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8090/usuario'; 
  private tokenKey = 'authToken';
  private adminKey = 'isAdmin';

  constructor(private http: HttpClient) {}

  autenticarUsuario(login: string, senha: string): Observable<AuthResponse> {
    const url = `${this.apiUrl}/autenticar`;
    
    const params = new HttpParams()
      .set('login', login)
      .set('senha', senha);

    console.log('Dados enviados no corpo da solicitação:', params);

    return this.http.post<AuthResponse>(url, params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).pipe(
      tap((resposta) => {
        this.handleAuthResponse(resposta)}),
      catchError((error: any) => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }

  renovarToken(token: string): Observable<AuthResponse> {
    const url = `${this.apiUrl}/renovar-ticket?token=${token}`;

    return this.http.post<AuthResponse>(url, {}, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).pipe(
      tap((resposta) => {
        this.handleAuthResponse(resposta);
      }),
      catchError((error: any) => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }

  private handleAuthResponse(resposta: AuthResponse): void {
    if (resposta.token !== undefined && resposta.isAdmin !== undefined) {
      localStorage.setItem(this.tokenKey, resposta.token);
      localStorage.setItem(this.adminKey, resposta.isAdmin.toString());
    } else {
      console.error('Token ou isAdmin é indefinido na resposta do servidor:', resposta);
    }
  }

  obterTokenSalvo(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  obterAdminSalvo(): boolean {
    const isAdmin = localStorage.getItem(this.adminKey);
    return isAdmin ? JSON.parse(isAdmin) : false;
  }

  limparTokenEAdmin(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.adminKey);
  }

  private handleError(error: any): void {
    console.error('Erro:', error);
  }
}
