import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
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

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);