import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-add-taluka',
  standalone: false,
  templateUrl: './add-taluka.component.html',
  styleUrl: './add-taluka.component.scss'
})
export class AddTalukaComponent implements OnInit {
  editForm: boolean = true;
  StateData: any[] = [];
  districtData: any[] = [];
  talukaData: any[] = []
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddTalukaComponent>, private addressService: AddressService) { }
  addTalukaForm: FormGroup

  ngOnInit(): void {
    this.buildState();
    this.fetchStateMaster();
  }
  buildState() {
    this.addTalukaForm = new FormGroup({
      state: new FormControl(null, [Validators.required]),
      district: new FormControl(null, [Validators.required]),
      taluka: new FormControl(null, [Validators.required]),




    });

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
        this.StateData = response.data.resultArray
      },
      error: (error) => {

      }
    })
  }

  submit() {
    const data = this.addTalukaForm.value
    this.addressService.addTalukaMaster(data).subscribe({
      next: (response: any) => {
        if (response.code === "SUCCESS") {
          this.dialogRef.close()
        }
      },
      error: (error: any) => {

      }
    })
  }
  checkPinCode(event: any) { }
  onStateSelection(event: string) {
    debugger
    const state = event;
    this.fetchStateWiseDistrict(state)
  }

  fetchDistrictWiseTaluka(event: string) {
    debugger
    const state = event;
    this.fetchStateWiseDistrict(state)
  }

  
  formatStateName(event: any) {
    event.target.value = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1).toLowerCase();
  }
}
