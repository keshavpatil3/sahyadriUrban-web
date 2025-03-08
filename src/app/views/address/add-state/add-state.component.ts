import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { AddressService } from '../address.service';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
export interface vehicleBrandList {

}
@Component({
  selector: 'app-add-state',
  standalone: false,
  templateUrl: './add-state.component.html',
  styleUrl: './add-state.component.scss',
  animations: egretAnimations
})
export class AddStateComponent implements OnInit {
  editForm: boolean = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddStateComponent>, private addressService: AddressService) { }
  addStateForm: FormGroup
  ngOnInit(): void {
    this.buildState(this.data.payload)
  }
  buildState(data:any) {
    this.addStateForm = new FormGroup({
      state: new FormControl(data.state, [Validators.required]),

    });


  }
  formatStateName(event: any) {
    event.target.value = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1).toLowerCase();
  }
  
  submit() {
    this.addressService.addStateMaster(this.addStateForm.value).subscribe({
      next: (response: any) => {
        console.log(response)
      },
      error: (error) => {

      }
    })
  }

}
