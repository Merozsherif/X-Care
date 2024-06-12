import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as aos from 'aos';
import { jwtDecode } from 'jwt-decode';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

import * as CryptoJS from 'crypto-js';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    // autoplay:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoHeight: true,

    autoplayTimeout: 3000,
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
    center: true
  }
  form!: FormGroup;
  submitted: boolean = false;

  constructor(private router: Router, private formbuilder: FormBuilder, private logIn: AuthService, private toastr: ToastrService,) { }

  ngOnInit(): void {
    aos.init();
    this.form = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
  get f() { return this.form.controls }

  // get cookies for fetching data
  getCookie(name: string): string {
    let cookieValue = '';
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  // Function to fetch the current order ID from the server
  fetchCurrentOrderId = (token: string): Promise<number | null> => {
    return fetch('https://ai-x-care.future-developers.cloud/get/current_order', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token ,// Assuming JWT or similar
        'X-CSRFToken': this.getCookie('csrftoken')
      }
    })
    .then(response => {
      console.log('Response status:', response.status); // Log response status
      if (!response.ok) {
        throw new Error('Failed to fetch current order ID');
      }
      return response.json();
    })
    .then(data => {
      return data.order_id ? Number(data.order_id) : null;
    })
    .catch(error => {
      console.error('Error fetching order ID:', error);
      return null;
    });
  };
  
  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      if (this.form.controls['email'].errors) {
        this.toastr.error('', 'Email is required', {
          closeButton: true,
          tapToDismiss: true,
          disableTimeOut: false,
          timeOut: 3000
        });
      }
      if (this.form.controls['password'].errors) {
        this.toastr.error('', 'Password is required', {
          closeButton: true,
          tapToDismiss: true,
          disableTimeOut: false,
          timeOut: 3000
        });
      }
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }
    this.logIn.getUser(this.form.value).subscribe((data: any) => {
      if (data.access) {
          // Encrypt JWT token
        const secretKey = 'done-by-zkzk'; // Replace with your secret key
        const encryptedToken = CryptoJS.AES.encrypt(data.access, secretKey).toString();
        // console.log(encryptedToken)
        localStorage.setItem('access_token', encryptedToken);
        const decoded: any = jwtDecode(data.access);
        this.fetchCurrentOrderId(data.access).then(orderId => {
          if (orderId) {
            localStorage.setItem('order_id', orderId.toString());
          } else {
            console.log('There is no order');
          }
        });
        this.toastr.info('Login successful');
        // localStorage.setItem('jwt', JSON.stringify(decoded));
        this.logIn.currentUserSubject.next(decoded);
        this.logIn.refreshuser.next(true);
        this.router.navigate(['/']);
      }
    });
  }
  
}
