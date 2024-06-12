// import { DoctorComponent } from './doctor/doctor.component';
// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule, Routes } from '@angular/router';
// import { DashboardLayoutComponent } from 'src/app/layouts/dashboard-layout/dashboard-layout.component';
// import { ProfileComponent } from './profile/profile.component';
// import { MyPostComponent } from './my-post/my-post.component';
// import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
// import { PatiantPrescriptionsComponent } from './patiant-prescriptions/patiant-prescriptions.component';
// import { ClinicComponent } from './clinic/clinic.component';
// import { ClinicReservationsComponent } from './clinic-reservations/clinic-reservations.component';
// import { MyReservationsComponent } from './my-reservations/my-reservations.component';


// const routes: Routes = [
//   {
//     path:'',
//     component:DashboardLayoutComponent,
//     children:[
//       {
//         path:'profile',
//         component:ProfileComponent
//       },
//       {
//         path:'doctor',
//         component:DoctorComponent
//       },
//       {
//         path:'clinic',
//         component:ClinicComponent
//       },
//       {
//         path:'myReservations',
//         component:MyReservationsComponent
//       },
//       {
//         path:'clinicReservations',
//         component:ClinicReservationsComponent
//       },
//       {
//         path:'patiantPrescriptions',
//         component:PatiantPrescriptionsComponent
//       },
//       {
//         path:'Prescriptions',
//         component:PrescriptionsComponent
//       },
//       {
//         path:'myPost',
//         component:MyPostComponent
//       },

//     ]
//   }
// ];
// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class DashboardRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from 'src/app/layouts/dashboard-layout/dashboard-layout.component';
import { ProfileComponent } from './profile/profile.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ClinicComponent } from './clinic/clinic.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { ClinicReservationsComponent } from './clinic-reservations/clinic-reservations.component';
import { PatiantPrescriptionsComponent } from './patiant-prescriptions/patiant-prescriptions.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
import { MyPostComponent } from './my-post/my-post.component';
import { AuthGuard } from 'src/app/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'profile', component: ProfileComponent ,canActivate:[AuthGuard]  },
      { path: 'doctor', component: DoctorComponent , canActivate:[AuthGuard] },
      { path: 'clinic', component: ClinicComponent  , canActivate:[AuthGuard]},
      { path: 'myReservations', component: MyReservationsComponent , canActivate:[AuthGuard]  },
      { path: 'clinicReservations', component: ClinicReservationsComponent , canActivate:[AuthGuard] },
      { path: 'patiantPrescriptions', component: PatiantPrescriptionsComponent , canActivate:[AuthGuard] },
      { path: 'Prescriptions', component: PrescriptionsComponent , canActivate:[AuthGuard] },
      { path: 'myPost', component: MyPostComponent  , canActivate:[AuthGuard]},
      { path: '', redirectTo: 'profile', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
