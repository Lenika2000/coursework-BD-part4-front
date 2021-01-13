import { Component, OnInit } from '@angular/core';
import {AppScreen} from './components/menu/menu.component';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  activeScreen: AppScreen = 'activities';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logOut();
    this.router.navigateByUrl('login');
  }
}
