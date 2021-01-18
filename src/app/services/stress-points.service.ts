import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StressPointsService {

  constructor(private readonly http: HttpClient, private authService: AuthService) { }

  getStressPoint(): Observable<any> {
    return this.http.get(this.authService.getUrl() + '/me/stress', { headers: this.authService.getHeaders()});
  }

  updateMaxStressLevel(maxStressLevel: number): Observable<any> {
    return this.http.put(this.authService.getUrl() + `/me/stress`, {max_stress_lvl: maxStressLevel},
      { headers: this.authService.getHeaders()});
  }

}

export interface Stress {
  current_stress: number;
  max_stress: number;
}
