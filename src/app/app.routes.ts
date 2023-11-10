import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CountriesComponent } from './components/countries/countries.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'countries', component: CountriesComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];