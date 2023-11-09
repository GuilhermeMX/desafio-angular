import { Injectable } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';
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
        console.log('Resposta do servidor:', resposta);
        this.salvarTokenEAdmin(resposta.token, resposta.isAdmin);
      }),
      catchError((error: any) => {
        console.log('ja deu erro')
        this.handleError(error);
        return throwError(error);
      })
    );
  }

  renovarToken(token: string): Observable<any> {
    // Simular a renovação do token
    const respostaSimulada = {
      token: 'novo_token_simulado',
      isAdmin: true,
      expiracao: new Date().getTime() + 300000, // 5 minutos a partir do momento atual
    };

    this.salvarTokenEAdmin(respostaSimulada.token, respostaSimulada.isAdmin);

    return of(respostaSimulada).pipe(delay(1000));
  }

  private salvarTokenEAdmin(token: string | undefined, isAdmin: boolean | undefined): void {
    if (token && isAdmin !== undefined) {
      localStorage.setItem(this.tokenKey, token);
      localStorage.setItem(this.adminKey, isAdmin.toString());
    } else {
      console.error(this.tokenKey, this);
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

  private handleError<T>(operation = 'Operation', resultado?: T): Observable<T> {
    console.error(`${operation} falhou`);
    return of(resultado as T);
  }
}
