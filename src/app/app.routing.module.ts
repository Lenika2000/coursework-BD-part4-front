import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {AuthPageComponent} from './pages/auth-page/auth-page.component';
import {UrlPermissionService} from './services/url-permission.service';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full', canActivate: [UrlPermissionService]},
  {path: 'login', component: AuthPageComponent, canActivate: [UrlPermissionService]},
  {path: 'schedule', component: MainPageComponent, canActivate: [UrlPermissionService]},
  {path: '**', redirectTo: '/login', pathMatch: 'full', canActivate: [UrlPermissionService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
