import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {AuthPageComponent} from './pages/auth-page/auth-page.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: AuthPageComponent},
  {path: 'schedule', component: MainPageComponent},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

// const routes: Routes = [
//   {path: '', redirectTo: '/login', pathMatch: 'full', canActivate: [UrlPermission]},
//   {path: 'login', component: AuthPageComponent, canActivate: [UrlPermission]},
//   {path: 'schedule', component: MainPageComponent, canActivate: [UrlPermission]},
//   {path: '**', redirectTo: '/login', pathMatch: 'full', canActivate: [UrlPermission]}
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
