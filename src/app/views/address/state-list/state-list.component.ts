import { Component, OnInit } from '@angular/core';
import { AddressService } from '../address.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { AddStateComponent } from '../add-state/add-state.component';
import { egretAnimations } from 'app/shared/animations/egret-animations';
export interface State {

}
@Component({
  selector: 'app-state-list',
  standalone: false,
  templateUrl: './state-list.component.html',
  styleUrl: './state-list.component.scss',
  animations: egretAnimations
})
export class StateListComponent implements OnInit {
  hidePageSize = true;
  showPageSizeOptions = false;
  showFirstLastButtons = true;
  disabled = false;
  length: any = 5;
  pageSize = 20;
  pageIndex = 0;
  lastDocId = 0;
  constructor(private dialog: MatDialog, private addressService: AddressService, private snack: MatSnackBar, private loader: AppLoaderService,) { };
  displayedColumns: string[] = ['position', 'companyName', 'edit'];
  dataSource = new MatTableDataSource<State>([
    { position: 1, stateName: 'Maharashtra' },
    { position: 2, stateName: 'Karnataka' },
    { position: 3, stateName: 'Gujarat' },
    { position: 4, stateName: 'Rajasthan' },
    { position: 5, stateName: 'Tamil Nadu' }
  ]);

  ngOnInit(): void {

  }
  pageChanged(event: any) {

  };
  openPopUp(data: any = {}, isNew?) {
    debugger
    console.log("popdata", data)
    let title = isNew ? 'Add new State' : 'Update State';
    let dialogRef: MatDialogRef<any> = this.dialog.open(AddStateComponent, {

      width: '720px',
      disableClose: true,
      data: { title: title, payload: data }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        console.log("popup res", res)
        if (!res) {
          // If user press cancel
          return;
        }
        if (isNew) {
          this.loader.open('Adding new Vehicle Company');
          this.addressService.addNewState(res)
            .subscribe({
              next: (response: any) => {
                // this.fetchAllState(0, this.pageSize, 0)
                this.loader.close();
                this.snack.open(response.message, 'OK', { duration: 2000 })
              },
              error: (error: any) => {
                this.loader.close();
              }
            })
        }

        // else {
        //   this.loader.open('Updating Customer');
        //   this.VehicleDirectoryService.editVehicleBrand(data.id, res)
        //     .subscribe(data => {
        //       this.fetchAllVehicleBrand(0, this.pageSize, 0)
        //       this.loader.close();
        //       this.snack.open(data.message, 'OK', { duration: 2000 })
        //     },
        //       error => {

        //       }
        //     )
        // }
      })
  }
  onKeyUpEvent(event:any){}

}
