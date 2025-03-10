import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AddressService } from '../address.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private fb: FormBuilder, private addressService: AddressService,private snackBar: MatSnackBar) {}
  showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', { duration: 2000 });
  }
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
    if (this.isEdit && this.editIndex!== null) {
      const existingState = this.dataSource.data[this.editIndex];
      
      if (!existingState ||!existingState.id) {
        console.error('Error: Missing state ID for update.');
        return;
      }
      const updatedState = { state: this.stateForm.value.state };
  
      
      const updateData = {
        oldState: existingState.state,
        newState: updatedState.state
      };
      
      this.addressService.editStateMaster(existingState.id, updateData).subscribe({
        next: (response) => {
          console.log('Update Response:', response);
          this.showSnackbar('State Updated Successfully!');
      
          // Update the state in the local array
          this.dataSource.data[this.editIndex].state = updateData.newState;
      
          // Reassign data to force Angular to detect changes
          this.dataSource = new MatTableDataSource(this.dataSource.data);
          this.dataSource.paginator = this.paginator;
      
          this.resetForm();
        },
        error: (error) => console.error('Error updating state:', error)
      });
    } else {
      // Add new state API call
      const newState = this.stateForm.value.state;
      this.addressService.addStateMaster({ state: newState }).subscribe({
        next: (response) => {
          console.log('Add Response:', response);
          this.showSnackbar('State Added Successfully!');
          this.fetchStateMaster(); // Refresh data after adding new state
          this.resetForm();
        },
        error: (error) => console.error('Error adding state:', error)
      });
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
  deleteState(index: number) {
    this.dataSource.data.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    this.showSnackbar('State deleted successfully!');

  }

}
