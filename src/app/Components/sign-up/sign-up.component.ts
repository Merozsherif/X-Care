import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Aos from 'aos';
import { jwtDecode } from 'jwt-decode';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoHeight: true,

    autoplayTimeout:3000,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false,

  }
  form!: FormGroup;
  submitted: boolean = false;
  constructor( private router:Router,private formbuilder:FormBuilder,  private logIn: AuthService, private toastr: ToastrService,) { }

  ngOnInit(): void {
    Aos.init()
    this.form = this.formbuilder.group({

      first_name:['',[Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      last_name:['',[Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      email:['',[Validators.required , Validators.email ]],
      password:['',Validators.required],
      group_name:['',Validators.required]
    })
  }
  get f() {return this.form.controls}
  createPass(val:any , confirm:any){
    if(val!=confirm){
      this.toastr.error('', 'confirm password is uncorrect' ,{
        closeButton: true,
        tapToDismiss:true,
        disableTimeOut:false,
        timeOut: 3000
    });
    return
      }
    }
  submit() {
    this.submitted = true;
    // console.log(this.form.value)
    if (this.form.invalid) {
      if(this.form.controls['first_name'].errors){
        this.toastr.error('', 'first_name is required and letters only' ,{
          closeButton: true,
          tapToDismiss:true,
          disableTimeOut:false,
          timeOut: 3000
      });

      }
      if(this.form.controls['last_name'].errors){
        this.toastr.error('','last_name  is required and letters only'   ,{
          closeButton: true,
          tapToDismiss:true,
          disableTimeOut:false,
          timeOut: 3000
      });
      }
      if(this.form.controls['email'].errors){
        this.toastr.error('','email is required'   ,{
          closeButton: true,
          tapToDismiss:true,
          disableTimeOut:false,
          timeOut: 3000
      });
      }
      if(this.form.controls['password'].errors){
        this.toastr.error('','password is required'   ,{
          closeButton: true,
          tapToDismiss:true,
          disableTimeOut:false,
          timeOut: 3000
      });
      if(this.form.controls['groups'].errors){
        this.toastr.error('','groups is required'   ,{
          closeButton: true,
          tapToDismiss:true,
          disableTimeOut:false,
          timeOut: 3000
      });
      }

  }
  window.scroll({ top: 0, left: 0, behavior: 'smooth' });return
}
let form={
  ...this.form.value,
  username:this.form.value.first_name
}
this.logIn.createUser(form).subscribe((data: any) => {
  // console.log(data)
  // Encrypt JWT token
  const secretKey = 'done-by-zkzk'; // Replace with your secret key
  const encryptedToken = CryptoJS.AES.encrypt(data.access, secretKey).toString();
  // console.log(encryptedToken)
  localStorage.setItem('access_token', encryptedToken)
  const decoded:any = jwtDecode(data.access)
  // console.log(decoded);

  this.toastr.info('registaration is successful')
  // localStorage.setItem('jwt', JSON.stringify(decoded));
  this.logIn.currentUserSubject.next(decoded)
  this.logIn.refreshuser.next(true)
  this.router.navigate(['/'] )
})
}
}
