import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private readonly http: HttpClient, private authService: AuthService) { }

  getLocations(): Observable<any> {
    return this.http.get(this.authService.getUrl() + '/locations', { headers: this.authService.getHeaders()});
  }

}
