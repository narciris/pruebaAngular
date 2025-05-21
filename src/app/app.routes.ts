import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'logs',loadComponent: () => import('./pages/registration/registration.component').then(m=>m.RegistrationComponent)}
,
{path: 'home',loadComponent: ()=> import('./pages/home/home.component').then(m => m.HomeComponent)},
    {path:'',
     redirectTo:'home',
     pathMatch: 'full'
    }
];
