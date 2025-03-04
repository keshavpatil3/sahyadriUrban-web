import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressRoutingModule } from './address-routing.module';
import { AddressComponent } from './address.component';
import { StateListComponent } from './state-list/state-list.component';
import { AddStateComponent } from './add-state/add-state.component';
import { DistrictListComponent } from './district-list/district-list.component';
import { AddDistrictComponent } from './add-district/add-district.component';
import { LocationListComponent } from './location-list/location-list.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { TalukaListComponent } from './taluka-list/taluka-list.component';
import { AddTalukaComponent } from './add-taluka/add-taluka.component';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { CityListComponent } from './city-list/city-list.component';
import { SharedDirectivesModule } from 'app/shared/directives/shared-directives.module';
import { MaterialModule } from 'app/shared/models/material.model';


@NgModule({
  declarations: [
    AddressComponent,
    StateListComponent,
    AddStateComponent,
    DistrictListComponent,
    AddDistrictComponent,
    LocationListComponent,
    AddLocationComponent,
    TalukaListComponent,
    AddTalukaComponent,
    CityListComponent
  ],
  imports: [
    CommonModule,
    AddressRoutingModule,
    SharedMaterialModule,
    SharedDirectivesModule,
    MaterialModule
  ]
})
export class AddressModule { }
