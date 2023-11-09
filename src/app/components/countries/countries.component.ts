import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css'
})
export class CountriesComponent implements OnInit {
  paises: any[] = []; // Tipo pode ser ajustado conforme a estrutura do backend

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries() {
    this.countryService.getCountry().subscribe(
      (data: any) => {
        this.paises = data; // gettin countries list
      },
      error => {
        console.error('Erro ao obter países:', error);
      }
    );
  }
}
