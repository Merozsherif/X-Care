import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeLayoutComponent } from 'src/app/layouts/home-layout/home-layout.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path:'',
    component:HomeLayoutComponent,
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
        path:'Cart',
        component:CartComponent,
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
