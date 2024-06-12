import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';

import { HomeComponent } from './home/home.component';
import { BlogLayoutComponent } from 'src/app/layouts/blog-layout/blog-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BlogLayoutComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class BlogsModule { }
