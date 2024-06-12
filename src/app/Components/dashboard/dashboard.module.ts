// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { CarouselModule } from 'ngx-owl-carousel-o';
// import { HttpClientModule } from '@angular/common/http';
// import { ToastrModule } from 'ngx-toastr';
// import { NgxSpinnerModule } from 'ngx-spinner';
// import { SharedModule } from 'src/app/shared/shared.module';
// import { HomeRoutingModule } from '../home/home-routing.module';

// import { ProfileComponent } from './profile/profile.component';
// import { DashboardLayoutComponent } from 'src/app/layouts/dashboard-layout/dashboard-layout.component';
// import { DoctorComponent } from './doctor/doctor.component';
// import { ClinicComponent } from './clinic/clinic.component';
// import { MyReservationsComponent } from './my-reservations/my-reservations.component';
// import { ClinicReservationsComponent } from './clinic-reservations/clinic-reservations.component';
// import { PatiantPrescriptionsComponent } from './patiant-prescriptions/patiant-prescriptions.component';
// import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
// import { MyPostComponent } from './my-post/my-post.component';
// import { DashboardRoutingModule } from './dashboard-routing.module';

// @NgModule({
//   declarations: [
//     DashboardLayoutComponent,
//     ProfileComponent,
//     DoctorComponent,
//     ClinicComponent,
//     MyReservationsComponent,
//     ClinicReservationsComponent,
//     PatiantPrescriptionsComponent,
//     PrescriptionsComponent,
//     MyPostComponent
//   ],
//   imports: [
//     // CommonModule,
//     // SharedModule,
//     // FormsModule,
//     // ReactiveFormsModule,
//     // DashboardRoutingModule ,// Import the routing module here
//     // // BrowserAnimationsModule,
//     NgxSpinnerModule,
//     CarouselModule,
// DashboardRoutingModule,
//     // // HttpClientModule,
//     // // ToastrModule.forRoot(),
//     CommonModule,
//     SharedModule,
//     FormsModule,
//     ReactiveFormsModule,

//   ]
// })
// export class DashboardModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { ProfileComponent } from './profile/profile.component';
import { DashboardLayoutComponent } from 'src/app/layouts/dashboard-layout/dashboard-layout.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ClinicComponent } from './clinic/clinic.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { ClinicReservationsComponent } from './clinic-reservations/clinic-reservations.component';
import { PatiantPrescriptionsComponent } from './patiant-prescriptions/patiant-prescriptions.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
import { MyPostComponent } from './my-post/my-post.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    ProfileComponent,
    DoctorComponent,
    ClinicComponent,
    MyReservationsComponent,
    ClinicReservationsComponent,
    PatiantPrescriptionsComponent,
    PrescriptionsComponent,
    MyPostComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    NgxSpinnerModule,
    CarouselModule
  ]
})
export class DashboardModule {}
