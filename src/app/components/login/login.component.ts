import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  fazerLogin() {
    if (this.loginForm.valid) {
      const { login, senha } = this.loginForm.value;

      this.authService.autenticarUsuario(login, senha).subscribe(
        (resposta) => {
          console.log('Login bem-sucedido!', resposta);

          this.router.navigate(['/countries'])
        },
        (erro) => {
          console.error('Erro ao autenticar', erro);

          // Lidar com erros de autenticação, por exemplo, exibir uma mensagem de erro no formulário
        }
      );
    } else {
      // Tratar o formulário inválido se necessário
      console.error('Formulário inválido', this.loginForm);
    }
  }
}
