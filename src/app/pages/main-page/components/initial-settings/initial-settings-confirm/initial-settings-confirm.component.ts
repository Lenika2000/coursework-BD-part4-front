import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-initial-settings-confirm',
  templateUrl: './initial-settings-confirm.component.html',
  styleUrls: ['./initial-settings-confirm.component.css']
})
export class InitialSettingsConfirmComponent implements OnInit {

  constructor(
    public confirmDialogRef: MatDialogRef<InitialSettingsConfirmComponent>) {
  }

  closeDialog(): void {
    this.confirmDialogRef.close();
  }

  ngOnInit(): void {
  }
}
