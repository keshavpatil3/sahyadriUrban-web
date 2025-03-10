import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AddressService } from '../address.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';

export interface State {
  id?: number;
  state: string;
}

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrl: './state-list.component.scss'
})
export class StateListComponent implements OnInit {
  stateForm: FormGroup;
  isEdit = false;
  showTable = false; // Controls visibility of the table
  displayedColumns: string[] = ['position', 'state', 'edit'];
  dataSource = new MatTableDataSource<State>([]);
  editIndex: number | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private addressService: AddressService) {}

  ngOnInit(): void {
    this.stateForm = this.fb.group({
      state: ['', Validators.required]
    });

    this.dataSource.filterPredicate = (data: State, filter: string) => 
      data.state.toLowerCase().includes(filter);

    this.fetchStateMaster(); // ✅ Load states on component initialization
  }

  fetchStateMaster() {
    this.addressService.fetchStateMaster().subscribe({
      next: (response: any) => {
        console.log('API Fetch Response:', response);
        
        if (response && response.data && response.data.resultArray) {
          this.dataSource = new MatTableDataSource(response.data.resultArray);
          this.dataSource.paginator = this.paginator; // ✅ Assign paginator here
        } else {
          console.error('Invalid response format:', response);
        }
      },
      error: (error) => console.error('Error fetching states:', error)
    });
  }
  
  
  submit() {
    if (this.stateForm.valid) {
      const updatedState = { state: this.stateForm.value.state };
  
      if (this.isEdit && this.editIndex !== null) {
        const existingState = this.dataSource.data[this.editIndex];
  
        if (!existingState || !existingState.id) {
          console.error('Error: Missing state ID for update.');
          return;
        }
  
        this.addressService.updateStateMaster(existingState.id, updatedState).subscribe({
          next: (response) => {
            console.log('Update Response:', response);
  
            // ✅ Update the state in the local array
            this.dataSource.data[this.editIndex] = { ...existingState, ...updatedState };
  
            // ✅ Reassign data to force Angular to detect changes
            this.dataSource = new MatTableDataSource(this.dataSource.data);
            this.dataSource.paginator = this.paginator;
  
            this.resetForm();
          },
          error: (error) => console.error('Error updating state:', error)
        });
  
      } else {
        // ✅ Adding new state
        this.addressService.addStateMaster(updatedState).subscribe({
          next: (response: any) => {
            console.log('Add Response:', response);
            this.fetchStateMaster(); // ✅ Reload the full list after adding
            this.resetForm();
          },
          error: (error) => console.error('Error adding state:', error)
        });
      }
    }
  }
  
  resetForm() {
    this.stateForm.reset();
    this.isEdit = false;
    this.editIndex = null;
  }

  toggleTable() {
    this.showTable = !this.showTable;
    
    if (this.showTable) {
      this.fetchStateMaster(); // Refresh data when table is shown
    }
  }

  onKeyUpEvent(event: any) {
    const searchValue = event.target.value.trim().toLowerCase();
    this.dataSource.filter = searchValue;
  }

  openForm(state?: any, index?: number) {
    if (state) {
      this.stateForm.patchValue(state);
      this.isEdit = true;
      this.editIndex = index; // ✅ Store index for reference
    } else {
      this.isEdit = false;
      this.editIndex = null;
      this.stateForm.reset();
    }
  }
  
}
