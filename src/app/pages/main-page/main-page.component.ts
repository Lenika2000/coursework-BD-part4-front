import { Component, OnInit } from '@angular/core';
import {AppScreen} from './components/menu/menu.component';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Location} from '../../models/activity.model';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {AddUpdateLocationComponent} from './components/settings/add-update-location/add-update-location.component';
import {InitialSettingsComponent} from './components/initial-settings/initial-settings.component';

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
