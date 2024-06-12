import { MedicineLayoutComponent } from 'src/app/layouts/medicine-layout/medicine-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MedicineDetailsComponent } from './medicine-details/medicine-details.component';
import { CatogryDetailsComponent } from './catogry-details/catogry-details.component';

const routes: Routes = [
  {
    path:'',
    component:MedicineLayoutComponent,
    children:[
      {
        path:'',
        component:HomeComponent
      },
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'category_details',
        component:CatogryDetailsComponent
      },
      {
        path:'medicine_details',
        component:MedicineDetailsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicineRoutingModule { }
