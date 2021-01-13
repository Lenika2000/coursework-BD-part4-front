import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SettingsService} from '../../../../services/settings.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../auth-page/auth-page.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settingForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private dialog: MatDialog, private settingService: SettingsService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.settingForm = this.formBuilder.group({
      maxStressLevel: [1000, {
        validators: [Validators.required,
          Validators.pattern('^-?(0|[1-9]\\d*)([.,]\\d+)?'), Validators.min(1)]
    }]});
  }

  updateListName(): void {
    // todo сервер
  }

}
