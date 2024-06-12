import { MedicineModule } from './Components/medicine/medicine.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { CartComponent } from './Components/home/cart/cart.component';
import { AuthenticatedGuard } from 'src/app/services/unAuth.gruad';

const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },

  {
    path:'Home',
    loadChildren: () => import('./Components/home/home.module').then(m => m.HomeModule)
  },
  {
    path:'Medicine',
    loadChildren: () => import('./Components/medicine/medicine.module').then(m => m.MedicineModule)
  },
  {
    path:'Doctors',
    loadChildren: () => import('./Components/doctors/doctors.module').then(m => m.DoctorsModule)
  },
  {
    path:'Blogs',
    loadChildren: () => import('./Components/blogs/blogs.module').then(m => m.BlogsModule)
  },
  {
    path:'Chat',
    loadChildren: () => import('./Components/chat/chat.module').then(m => m.ChatModule)
  },
  {
    path:'sign_in',
    component:SignInComponent,
    canActivate: [AuthenticatedGuard]

  },
  {
    path:'profile',
    loadChildren: () => import('./Components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path:'sign_up',
    component:SignUpComponent,
    canActivate: [AuthenticatedGuard]

  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
