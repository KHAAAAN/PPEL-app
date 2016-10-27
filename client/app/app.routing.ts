import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
    {
      path: 'home',
      component: HomeComponent,
    },
    { 
      path: '**', component: 
      HomeComponent 
    }
];

export const appRoutingProviders: any[] = [

];