import { Component, OnInit } from '@angular/core';
import { AddressService } from '../address.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { AddDistrictComponent } from '../add-district/add-district.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  state: any;
  isEdit = false;
  showTable = false;
  addDistrictForm: FormGroup
  StateData: any[] = []
  constructor(private dialog: MatDialog, private addressService: AddressService, private snack: MatSnackBar, private loader: AppLoaderService,) { };
  displayedColumns: string[] = ['position', 'district', 'edit'];
  dataSource = new MatTableDataSource<State>([]);

  ngOnInit(): void {
    this.fetchStateMaster();
    this.buildState()
  }
  pageChanged(event: any) {

  };

  fetchStateMaster() {
    this.addressService.fetchStateMaster().subscribe({
      next: (response: any) => {
        this.StateData = response.data.resultArray;
        this.state = response.data.resultArray[0].state;
        this.fetchStateWiseDistrict(this.state)
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
  onEdit(data: any) {
    debugger
    this.isEdit = true;
    this.addDistrictForm.get('district').patchValue(data.district)
  }
  toggleTable() {
    this.showTable = !this.showTable;
    
    if (this.showTable) {
      this.fetchStateWiseDistrict(this.state); // Refresh data when table is shown
    }
  }
  onStateSelection(event: string) {
    this.isEdit=false
    this.addDistrictForm.get('district').reset()
    this.state = event;
    this.fetchStateWiseDistrict(this.state)
  }

  buildState() {
    this.addDistrictForm = new FormGroup({
      state: new FormControl(null, [Validators.required]),
      district: new FormControl(null, [Validators.required]),




    });

  }
  // fetchStateMaster() {
  //   this.addressService.fetchStateMaster().subscribe({
  //     next: (response: any) => {
  //       this.StateData = response.data.resultArray;
  //     },
  //     error: (error) => {

  //     }
  //   })
  // }
  formatStateName(event: any) {
    event.target.value = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1).toLowerCase();
  }

  submit() {
    this.loader.open('Please wait...');
    if(this.isEdit !== true) {
      this.addressService.addDistrictMaster(this.addDistrictForm.value).subscribe({
        next: (response: any) => {
          this.loader.close();
          if (response.code == "SUCCESS") {
            this.state = response.data.state;
            this.fetchStateWiseDistrict(this.state);
            this.addDistrictForm.get('district').reset();
            this.isEdit=false
          }
          console.log(response)
        },
        error: (error) => {
  
        }
      })
    }
    else {

    }
 
  }
}
