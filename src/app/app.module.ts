// import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { SignInComponent } from './Components/sign-in/sign-in.component';
// import { SignUpComponent } from './Components/sign-up/sign-up.component';
// import { CarouselModule } from 'ngx-owl-carousel-o';
// import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { ReactiveFormsModule } from '@angular/forms';
// import { ToastrModule } from 'ngx-toastr';
// import { ErrorInterceptor } from './helpers/error.interceptor';
// import { JwtInterceptor } from './helpers/jwt.interceptor';
// import { CartComponent } from './Components/home/cart/cart.component';


// import { DashboardRoutingModule } from './Components/dashboard/dashboard-routing.module';




// @NgModule({
//   declarations: [
//     AppComponent,
//     SignInComponent,
//     SignUpComponent,
//     CartComponent,




//   ],
//   imports: [
//     ReactiveFormsModule,
//     BrowserModule,
//     AppRoutingModule,
//     BrowserAnimationsModule,
//     CarouselModule,
//     HttpClientModule,
//     BrowserAnimationsModule, // required animations module
//     ToastrModule.forRoot(), // ToastrModule added
//     DashboardRoutingModule, // ToastrModule added

//   ],
//   providers: [
//     { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
//     { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
//   ],
//   bootstrap: [AppComponent],
//   schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
// })
// export class AppModule { }
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { CartComponent } from './Components/home/cart/cart.component';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { DashboardModule } from './Components/dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    CarouselModule,
    DashboardModule // Ensure DashboardModule is imported here
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
