import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import {ActivitiesComponent} from './pages/main-page/components/activities/activities.component';
import {FiltersComponent} from './pages/main-page/components/filters/filters.component';
import { MenuComponent } from './pages/main-page/components/menu/menu.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {CommonModule} from '@angular/common';
import {HomePageComponent} from './pages/main-page/components/home-page/home-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {RegistrationPageComponent} from './pages/registration-page/registration-page.component';
import {AddActivityDialogComponent} from './pages/main-page/components/activities/add-activity-dialog/add-activity-dialog.component';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    MenuComponent,
    ActivitiesComponent,
    FiltersComponent,
    HomePageComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    AddActivityDialogComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE,
      useValue: 'ru-RU'},
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  entryComponents: [AddActivityDialogComponent]
})
export class AppModule { }
