import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address.component';
import { StateListComponent } from './state-list/state-list.component';
import { AddStateComponent } from './add-state/add-state.component';
import { DistrictListComponent } from './district-list/district-list.component';
import { AddDistrictComponent } from './add-district/add-district.component';
import { TalukaListComponent } from './taluka-list/taluka-list.component';
import { AddTalukaComponent } from './add-taluka/add-taluka.component';
import { CityListComponent } from './city-list/city-list.component';
import { LocationListComponent } from './location-list/location-list.component';

const routes: Routes = [{ path: '', component: AddressComponent,
  children:[
    {path:'state-list', component: StateListComponent},
    {path:'add-state',component:AddStateComponent},
    {path:'district-list',component:DistrictListComponent},
    {path:'add-district',component:AddDistrictComponent},
    {path:'taluka-list',component:TalukaListComponent},
    {path:'add-taluka',component:AddTalukaComponent},
    {path:'city-list',component:CityListComponent},
    {path:'location-list',component:LocationListComponent}
  ]
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule { }
