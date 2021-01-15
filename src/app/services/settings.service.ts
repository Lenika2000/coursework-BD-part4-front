import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Location} from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private readonly http: HttpClient, private authService: AuthService) { }

  getLocations(): Observable<any> {
    return this.http.get(this.authService.getUrl() + '/locations', { headers: this.authService.getHeaders()});
  }

  addLocation(locationName: string): Observable<any> {
    return this.http.post(this.authService.getUrl() + '/locations', {name: locationName},
    { headers: this.authService.getHeaders()});
  }

  deleteLocation(locationId: number): Observable<any> {
    return this.http.delete(this.authService.getUrl() + `/locations/${locationId}`,
      { headers: this.authService.getHeaders()});
  }

  updateLocation(location: Location): Observable<any> {
    return this.http.put(this.authService.getUrl() + `/locations/${location.id}`, {name: location.name},
      { headers: this.authService.getHeaders()});
  }

}
