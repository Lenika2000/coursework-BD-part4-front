import { Component, OnInit } from '@angular/core';
import {AppScreen} from './components/menu/menu.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  activeScreen: AppScreen = 'activities';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    localStorage.removeItem('part4.authToken');
    localStorage.removeItem('part4.currentUser');
    this.router.navigateByUrl('login');
  }
}
