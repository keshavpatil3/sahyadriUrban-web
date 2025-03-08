import { Component, OnInit } from '@angular/core';
import { AddressService } from '../address.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { AddDistrictComponent } from '../add-district/add-district.component';
export interface State {

}
@Component({
  selector: 'app-district-list',
  standalone: false,
  templateUrl: './district-list.component.html',
  styleUrl: './district-list.component.scss'
})
export class DistrictListComponent implements OnInit {
  hidePageSize = true;
  showPageSizeOptions = false;
  showFirstLastButtons = true;
  disabled = false;
  length: any = 5;
  pageSize = 20;
  pageIndex = 0;
  lastDocId = 0;
  state: any
  StateData: any[] = []
  constructor(private dialog: MatDialog, private addressService: AddressService, private snack: MatSnackBar, private loader: AppLoaderService,) { };
  displayedColumns: string[] = ['position', 'district', 'edit'];
  dataSource = new MatTableDataSource<State>([]);

  ngOnInit(): void {
    this.fetchStateMaster()
  }
  pageChanged(event: any) {

  };

  fetchStateMaster() {
    this.addressService.fetchStateMaster().subscribe({
      next: (response: any) => {
        this.StateData = response.data.resultArray;

      },
      error: (error) => {

      }
    })
  }

  fetchStateWiseDistrict(state: string) {
    this.addressService.fetchStateWiseDistrict(state).subscribe({
      next: (response: any) => {
        this.dataSource = response.data.resultArray;

      },
      error: (error) => {

      }
    })
  }

  openPopUp(data: any = {}, isNew?) {
    debugger
    console.log("popdata", data)
    let title = isNew ? 'Add New District' : 'Update District';
    let dialogRef: MatDialogRef<any> = this.dialog.open(AddDistrictComponent, {

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

        this.loader.open('Adding new District');
        this.addressService.addDistrictMaster(res)
          .subscribe({
            next: (response: any) => {
              this.fetchStateWiseDistrict(this.state)
              this.loader.close();
              this.snack.open(response.message, 'OK', { duration: 2000 })
            },
            error: (error: any) => {
              this.loader.close();
            }
          })


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
  onKeyUpEvent(event: any) { }

  onStateSelection(event: string) {
    debugger
    this.state = event;
    this.fetchStateWiseDistrict(this.state)
  }

}
