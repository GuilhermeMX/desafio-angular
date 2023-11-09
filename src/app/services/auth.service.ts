import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8090/usuario/autenticar'; 
  private tokenKey = 'authToken';
  private adminKey = 'isAdmin';

  autenticarUsuario(login: string, senha: string): Observable<any> {
    const url = `${this.apiUrl}/usuario/autenticar`;

    if ((login === 'admin' && senha === 'suporte') || (login === 'convidado' && senha === 'manager')) {
      const respostaSimulada = {
        token: 'token_simulado',
        isAdmin: login === 'admin',
        expiracao: new Date().getTime() + 300000, // 5 minutos a partir do momento atual
      };
  
      this.salvarTokenEAdmin(respostaSimulada.token, respostaSimulada.isAdmin);

      return of(respostaSimulada);
    } else {
      return this.handleError<any>('Autenticação', {});
    }
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

  private salvarTokenEAdmin(token: string, isAdmin: boolean): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.adminKey, isAdmin.toString());
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
