import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorsLayoutComponent } from '../../layouts/doctors-layout/doctors-layout.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { FormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import { RangeSlideDirective } from 'src/app/directives/range.directive';
import { DoctorsDetailsComponent } from './doctors-details/doctors-details.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    DoctorsLayoutComponent,
    HomeComponent,
    DoctorsListComponent,
    RangeSlideDirective,
    DoctorsDetailsComponent
  ],
  imports: [
    MatSliderModule,
    CommonModule,
    DoctorsRoutingModule,
    SharedModule,
NgxSpinnerModule,
    FormsModule
  ]
})
export class DoctorsModule { }
