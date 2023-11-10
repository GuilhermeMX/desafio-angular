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
  countries: any[] = []; 

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.loadCountries(token);
    } else {
      console.error('Token não encontrado.');
    }

  }

  loadCountries(token: string) {
    this.countryService.getCountry(token).subscribe(
      (countries) => {
        this.countries = countries;
      },
      (error) => {
        console.error('Erro ao carregar países', error);
      }
    );
  }
}
