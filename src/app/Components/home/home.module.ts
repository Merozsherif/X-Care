import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { HomeLayoutComponent } from 'src/app/layouts/home-layout/home-layout.component';
import { SharedModule } from "../../shared/shared.module";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSpinnerModule } from 'ngx-spinner';




@NgModule({
    declarations: [
        HomeComponent,
        HomeLayoutComponent,

    ],
    imports: [
      NgxSpinnerModule,
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        CarouselModule,
    ]
})
export class HomeModule { }
