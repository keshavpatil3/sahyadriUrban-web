import { Component, OnInit } from '@angular/core';
import { AddressService } from '../address.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { AddTalukaComponent } from '../add-taluka/add-taluka.component';
export interface State {

}
@Component({
  selector: 'app-taluka-list',
  standalone: false,
  templateUrl: './taluka-list.component.html',
  styleUrl: './taluka-list.component.scss'
})
export class TalukaListComponent implements OnInit {
  hidePageSize = true;
  showPageSizeOptions = false;
  showFirstLastButtons = true;
  disabled = false;
  length: any = 5;
  pageSize = 20;
  pageIndex = 0;
  lastDocId = 0;
  districtData:any[]=[];
  stateData:any[]=[];
  state:any;
  district:any;
  constructor(private dialog: MatDialog, private addressService: AddressService, private snack: MatSnackBar, private loader: AppLoaderService,) { };
  displayedColumns: string[] = ['position', 'stateName', 'district', 'taluka', 'edit'];
  dataSource = new MatTableDataSource<State>();

  ngOnInit(): void {
 this.fetchStateMaster()
  }
  pageChanged(event: any) {

  };
  openPopUp(data: any = {}, isNew?) {
    debugger
    console.log("popdata", data)
    let title = isNew ? 'Add New Taluka' : 'Update Taluka';
    let dialogRef: MatDialogRef<any> = this.dialog.open(AddTalukaComponent, {

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
          this.loader.open('Adding new Taluka');
          this.addressService.addStateMaster(res)
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
  onKeyUpEvent(event: any) { }

  fetchDistrictWiseTaluka(state: string, district: string) {
    this.addressService.fetchDistrictWiseTaluka(state, district).subscribe({
      next: (response: any) => {
        this.dataSource = response.data.resultArray
      },
      error: (error) => {

      }
    })
  }

  fetchStateWiseDistrict(state: any) {
    this.addressService.fetchStateWiseDistrict(state).subscribe({
      next: (response: any) => {
        this.districtData = response.data.resultArray
      },
      error: (error) => {

      }
    })
  }
  
 
  
  fetchStateMaster() {
    this.addressService.fetchStateMaster().subscribe({
      next: (response: any) => {
        this.stateData = response.data.resultArray
      },
      error: (error) => {

      }
    })
  }
  onStateSelection(event: string) {
    debugger
    this.state = event;
    this.fetchStateWiseDistrict(this.state)
  

}
onDistSelection(event: string){
  this.district= event;
  this.fetchDistrictWiseTaluka(this.state,this.district)
}
}