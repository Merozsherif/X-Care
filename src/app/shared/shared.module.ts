import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { SearchPipe } from '../pipes/search.pipe';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    NavbarComponent,
    FooterComponent,
    SearchPipe
  ]
})
export class SharedModule { }
