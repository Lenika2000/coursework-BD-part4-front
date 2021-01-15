import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {SettingsService} from '../../../../services/settings.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../auth-page/auth-page.component';
import {MatTable} from '@angular/material/table';
import {Location} from '../../../../models/activity.model';
import {AddUpdateLocationComponent} from './add-update-location/add-update-location.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public displayedColumns = ['name', 'update', 'delete'];
  public locations: Location[] = [];
  public selectedLocation: Location;
  @ViewChild('table', {static: false}) table: MatTable<Location>;
  settingForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private dialog: MatDialog, private settingService: SettingsService,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.getLocations();
    this.settingForm = this.formBuilder.group({
      maxStressLevel: [1000, {
        validators: [Validators.required,
          Validators.pattern('^-?(0|[1-9]\\d*)([.,]\\d+)?'), Validators.min(1)]
    }]});
  }

  updateListName(): void {
    // todo сервер
  }

  getLocations(): void {
    this.settingService.getLocations().subscribe((locations: Location[]) => {
        this.locations =  locations;
        this.updateLocationNames();
    });
  }

  openAddUpdateDialog(isAddOperation: boolean, location: Location): MatDialogRef<AddUpdateLocationComponent, any> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '200px';
    dialogConfig.width = '376px';
    dialogConfig.data = {
      location,
      isAddOperation
    };
    if (!isAddOperation) {
      this.selectedLocation = location;
    }
    return this.dialog.open(AddUpdateLocationComponent, dialogConfig);
  }

  updateLocationNames(): void {
    localStorage.setItem('part4.locations', JSON.stringify(this.locations));
  }

  updateLocation(location: Location): void {
    const dialogConfirmConfigRef = this.openAddUpdateDialog(false, location);
    dialogConfirmConfigRef.componentInstance.locationUpdate.subscribe((updatedLocation: Location) => {
      this.settingService.updateLocation(updatedLocation).subscribe(() => {
        this.selectedLocation = updatedLocation;
        this.updateLocationNames();
        this.table.renderRows();
      });
    });
  }

  addLocation(): void {
    const location = {
      name: '',
    };
    const dialogConfirmConfigRef = this.openAddUpdateDialog(true, location);
    dialogConfirmConfigRef.componentInstance.locationAdd.subscribe((newLocation: Location) => {
      this.settingService.addLocation(newLocation.name).subscribe(() => {
        this.getLocations();
        this.table.renderRows();
      });
    });
  }

  deleteLocation(location: Location): void {
    const deletedElemIndex = this.locations.findIndex((d) => d === location);
    this.settingService.deleteLocation(this.locations[deletedElemIndex].id).subscribe(() => {
      this.locations.splice(deletedElemIndex, 1);
      this.updateLocationNames();
      this.table.renderRows();
    });
  }

}
