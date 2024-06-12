import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsLayoutComponent } from 'src/app/layouts/doctors-layout/doctors-layout.component';
import { HomeComponent } from './home/home.component';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { DoctorsDetailsComponent } from './doctors-details/doctors-details.component';


const routes: Routes = [
  {
    path: '',
    component: DoctorsLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'list',
        component: DoctorsListComponent,
      },
      {
        path: 'doctor_details',
        component: DoctorsDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorsRoutingModule {}
