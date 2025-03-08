import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-add-district',
  standalone: false,
  templateUrl: './add-district.component.html',
  styleUrl: './add-district.component.scss'
})
export class AddDistrictComponent implements OnInit {
  editForm: boolean = true;
  StateData: any[] = [];
  districtData: any[] = [];
  talukaData: any[] = []
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddDistrictComponent>, private addressService: AddressService) { }
  addDistrictForm: FormGroup
  ngOnInit(): void {
    this.buildState();
    this.fetchStateMaster()
  }
  buildState() {
    this.addDistrictForm = new FormGroup({
      state: new FormControl(null, [Validators.required]),
      district: new FormControl(null, [Validators.required]),




    });

  }
  fetchStateMaster() {
    this.addressService.fetchStateMaster().subscribe({
      next: (response: any) => {
        this.StateData = response.data.resultArray;
      },
      error: (error) => {

      }
    })
  }
  formatStateName(event: any) {
    event.target.value = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1).toLowerCase();
  }

  submit() {
    this.addressService.addDistrictMaster(this.addDistrictForm.value).subscribe({
      next: (response: any) => {
        if (response.code == "SUCCESS") {
          this.dialogRef.close();
        }
        console.log(response)
      },
      error: (error) => {

      }
    })
  }
  checkPinCode(event: any) { }

}
