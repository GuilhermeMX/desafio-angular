import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-register-country',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register-country.component.html',
  styleUrl: './register-country.component.css'
})
export class RegisterCountryComponent {
  constructor(private countryService: CountryService) {}

  registerCountry(dadosPais: any, token: string) {
    this.countryService.registerCountry(dadosPais, token).subscribe(
      (resposta) => {
        console.log('País cadastrado com sucesso!')
      },
      (erro) => {
        console.log('Erro no cadastro!')
      }
    );
  }
}
