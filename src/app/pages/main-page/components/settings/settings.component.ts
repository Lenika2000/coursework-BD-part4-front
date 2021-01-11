import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {AddUpdateLocationComponent} from './add-update-location/add-update-location.component';
import {Location} from '../../../../models/activity.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public displayedColumns = ['name', 'address', 'update', 'delete'];
  public locations: Location[] = [];
  public selectedLocation: Location;
  @ViewChild('table', {static: false}) table: MatTable<Location>;

  constructor(private dialog: MatDialog) {
    this.locations = [
      {
        name: 'Магнит',
        address: 'Новоизмайловский пр. 15'
      },
      {
        name: 'Лента',
        address: 'Новоизмайловский пр. 18'
      }
    ];
    this.updateLocationNames();
  }

  ngOnInit(): void {
  }

  updateLocationNames(): void {
    const locationNames = [];
    this.locations.forEach((elem: Location) => {
      locationNames.push(elem.name);
    });
    localStorage.setItem('part4.locations', JSON.stringify(locationNames));
  }

  openAddUpdateDialog(isAddOperation: boolean, location: Location): MatDialogRef<AddUpdateLocationComponent, any> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '300px';
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

  updateLocation(location: Location): void {
    const dialogConfirmConfigRef = this.openAddUpdateDialog(false, location);
    dialogConfirmConfigRef.componentInstance.locationUpdate.subscribe((updatedLocation: Location) => {
      this.selectedLocation.name = updatedLocation.name;
      this.selectedLocation.address = updatedLocation.address;
      this.updateLocationNames();
      this.table.renderRows();
      // todo сервер
    });
  }

  addLocation(): void {
    const location = {
      name: '',
      address: '',
    };
    const dialogConfirmConfigRef = this.openAddUpdateDialog(true, location);
    dialogConfirmConfigRef.componentInstance.locationAdd.subscribe((newLocation: Location) => {
      this.locations.push(newLocation);
      this.updateLocationNames();
      this.table.renderRows();
      // todo сервер
    });
  }

  deleteLocation(location: Location): void {
    const deletedElemIndex = this.locations.findIndex((d) => d === location);
    this.locations.splice(deletedElemIndex, 1);
    this.updateLocationNames();
    this.table.renderRows();
    // todo сервер
  }

}
