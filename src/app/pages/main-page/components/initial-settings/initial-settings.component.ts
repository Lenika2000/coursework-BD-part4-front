import {Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../auth-page/auth-page.component';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {InitialSettingsConfirmComponent} from './initial-settings-confirm/initial-settings-confirm.component';
import {StressPointsService} from '../../../../services/stress-points.service';
import {FinanceService} from '../../../../services/finance.service';

@Component({
  selector: 'app-initial-settings',
  templateUrl: './initial-settings.component.html',
  styleUrls: ['./initial-settings.component.css']
})
export class InitialSettingsComponent implements OnInit {

  initForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor( private dialogRef: MatDialogRef<InitialSettingsComponent>,
               private formBuilder: FormBuilder,
               private dialog: MatDialog,
               private  stressPointsService: StressPointsService,
               private financeService: FinanceService) {
  }

  ngOnInit(): void {
    this.initForm = this.formBuilder.group({
      maxStressLevel: [ 600, {validators: [Validators.required,
          Validators.pattern('^-?(0|[1-9]\\d*)([.,]\\d+)?'), Validators.min(1)]}],
      currentStressLevel: [0, {validators: [Validators.required,
          Validators.pattern('^-?(0|[1-9]\\d*)([.,]\\d+)?'), Validators.min(0)]}],
      balance: [0 , {validators: [Validators.required,
          Validators.pattern('^-?(0|[1-9]\\d*)([.,]\\d+)?'), Validators.min(0)] }],
    });
  }

  closeDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '170px';
    dialogConfig.width = '330px';
    this.dialog.open(InitialSettingsConfirmComponent, dialogConfig);
    this.dialogRef.close();
  }

  onInitSettingsSave(): void {
    this.closeDialog();
    this.stressPointsService.updateMaxStressLevel( this.initForm.get('maxStressLevel').value).subscribe(() => {});
    this.financeService.setInitBalance(this.initForm.get('balance').value).subscribe(() => {});
    // todo сервер установка начальных значений
  }

}

export interface InitSettings {
  maxStressLevel: number;
  currentStressLevel: number;
  balance: number;
}
