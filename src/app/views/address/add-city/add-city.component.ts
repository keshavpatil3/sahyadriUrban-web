import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-add-city',
  standalone: false,
  templateUrl: './add-city.component.html',
  styleUrl: './add-city.component.scss'
})
export class AddCityComponent implements OnInit {
  editForm: boolean = true;
  StateData:any []=[];
  districtData:any[] =[];
  talukaData:any[]=[];
  state:any;
  district:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddCityComponent>,private addressService:AddressService) { }
  addCityForm: FormGroup
  submit() { 
    this.dialogRef.close(this.addCityForm.value)
  }
  ngOnInit(): void {
    this.buildState();
    this.fetchStateMaster()
  }
  buildState() {
    this.addCityForm = new FormGroup({
      stateName: new FormControl(null, [Validators.required]),
      zipCode: new FormControl(null, [Validators.required]),
      district: new FormControl(null, [Validators.required]),
      taluka: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      
    

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

  checkPinCode(event: any) { }

  onStateSelection(event: string) {
    debugger
    this.state = event;
    this.fetchStateWiseDistrict(this.state)
  

}
fetchDistrictWiseTaluka(state: string, district: string) {
  this.addressService.fetchDistrictWiseTaluka(state, district).subscribe({
    next: (response: any) => {
      this.talukaData= response.data.resultArray
    },
    error: (error) => {

    }
  })
}
onDistSelection(event: string){
  this.district= event;
  this.fetchDistrictWiseTaluka(this.state,this.district)
}
}
