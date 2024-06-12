import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicineRoutingModule } from './medicine-routing.module';
import { HomeComponent } from './home/home.component';
import { MedicineLayoutComponent } from 'src/app/layouts/medicine-layout/medicine-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MedicineDetailsComponent } from './medicine-details/medicine-details.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CatogryDetailsComponent } from './catogry-details/catogry-details.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    MedicineLayoutComponent,
    MedicineDetailsComponent,
    CatogryDetailsComponent,
  ],
  imports: [
    NgxSpinnerModule,
    CommonModule,
    MedicineRoutingModule,
    SharedModule,
    CarouselModule,
    FormsModule,

  ]
})
export class MedicineModule { }
