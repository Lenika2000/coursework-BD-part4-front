import {Component, OnInit, ViewChild} from '@angular/core';
import {FinanceElem, FinanceFilter} from '../../../../models/finance.model';
import {MatTable} from '@angular/material/table';
import {GroupByData} from '../../../../models/activity.model';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {AddUpdateFinanceDialogComponent} from './add-update-finance-dialog/add-update-finance-dialog.component';
import {of} from 'rxjs';
import {pairwise, startWith} from 'rxjs/operators';
import {FinanceService} from '../../../../services/finance.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {

  public displayedColumns = ['type', 'sum', 'description',
    'update', 'delete'];
  @ViewChild('table', {static: false}) table: MatTable<Location>;
  filteredTableData: FinanceElem[];
  groupedData: Array<any> = new Array<any>();
  finances: FinanceElem[] = [] ;
  filters: FinanceFilter = {
    startDate: new Date(),
    endDate: new Date(),
    isIncome: false,
    isExpenses: false,
  };
  selectedElem: FinanceElem;
  constructor(private dialog: MatDialog, private financeService: FinanceService) { }

  ngOnInit(): void {
    this.filters.endDate.setMonth(this.filters.startDate.getMonth() + 1);
    this.getFinances();
  }

  getFinances(): void {
    this.financeService.getFinances(this.filters.startDate, this.filters.endDate).subscribe((finances: FinanceElem[]) => {
      this.finances = finances;
      for ( const financeElem of this.finances) {
        financeElem.date = new Date(financeElem.date);
      }
      this.groupData();
    });
  }

  groupData(): void {
    this.groupedData = [];
    this.finances = this.sortDataByTimeASC(this.finances);
    this.changeFilter();
    of(...this.filteredTableData).pipe(
      startWith(null),
      pairwise(),
    ).subscribe(([prevPair, pair]) => {
        if (!prevPair) {
          this.groupedData.push(new GroupByData(pair.date.toLocaleDateString(), true));
          this.groupedData.push(pair);
        } else {
          if (prevPair.date.toLocaleDateString() === pair.date.toLocaleDateString()) {
            this.groupedData.push(pair);
          } else {
            this.groupedData.push(new GroupByData(pair.date.toLocaleDateString(), true));
            this.groupedData.push(pair);
          }
        }
      }
    ).unsubscribe();
  }

  openAddUpdateDialog(isAddOperation: boolean, financeElem: FinanceElem): MatDialogRef<AddUpdateFinanceDialogComponent, any>  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '450px';
    dialogConfig.width = '376px';
    dialogConfig.data = {
      financeElem,
      isAddOperation
    };
    if (!isAddOperation) {
      this.selectedElem = financeElem;
    }
    return this.dialog.open(AddUpdateFinanceDialogComponent, dialogConfig);
  }

  addElem(): void {
    const financeElem: FinanceElem =  {
      type: 'доход',
      cost: 0,
      item: '',
      date: new Date()
    };
    const dialogRef = this.openAddUpdateDialog(true, financeElem);

    dialogRef.componentInstance.elemAdd.subscribe((newRow: FinanceElem) => {
      this.financeService.addFinanceElem(newRow).subscribe((id: number) => {
          newRow.id = id;
          this.financeService.setBalanceSubject.next();
          this.finances.push(newRow);
          this.groupData();
          this.table.renderRows();
      });
    });
  }

  updateElem(financeElem: FinanceElem): void {
    this.selectedElem = financeElem;
    const dialogRef = this.openAddUpdateDialog(false, financeElem);

    dialogRef.componentInstance.elemUpdate.subscribe((updatedElem: FinanceElem) => {
      this.selectedElem.type = updatedElem.type;
      this.selectedElem.date = updatedElem.date;
      this.selectedElem.cost = updatedElem.cost;
      this.selectedElem.item = updatedElem.item;
      this.financeService.updateFinanceElem(this.selectedElem);
      this.groupData();
      this.table.renderRows();
    });
  }

  deleteElem(elem: FinanceElem): void {
    this.financeService.deleteFinanceElem(elem.id);
    const deletedElemIndex = this.finances.findIndex((d: FinanceElem) => d === elem);
    this.finances.splice(deletedElemIndex, 1);
    this.groupData();
    this.table.renderRows();
  }

  applyDateFilters(): void {
    this.getFinances();
  }

  changeFilter(): void {
    this.filteredTableData = this.finances;
    if (this.filters.isExpenses) {
      this.filteredTableData = this.filteredTableData.filter((row) => {
        return row.type === 'расход';
      });
    } else {
      if (this.filters.isIncome) {
        this.filteredTableData = this.filteredTableData.filter((row) => {
          return row.type === 'доход';
        });
      }
    }
  }

  isGroup(index, item): boolean {
    return item.isGroupBy;
  }

  sortDataByTimeASC(tableData: any): any[] {
    return (tableData.sort((a, b) => {
      return (a.date.getTime() - b.date.getTime());
    }));
  }
}
