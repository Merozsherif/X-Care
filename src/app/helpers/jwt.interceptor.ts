import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, filter } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  url: any = '';
  constructor(private authenticationService: AuthService) {

  }
  private getCookie(name: string): string {
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

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const currentUser = this.authenticationService?.currentUserValue;
    const isLoggedIn: any = localStorage.getItem('access_token');
 
    
    const cookiess = this.getCookie('csrftoken')

    request = request.clone({
      setHeaders: {
        'X-CSRFToken': cookiess
      }
    });
    

    // console.log('currentUser',currentUser , isLoggedIn)
    // console.log('===============JwtInterceptor=============')
    // console.log(request.url , request.method , window.location.href);
    // console.log(window.location.href.split('/').pop());
    if (isLoggedIn) {
         // Decrypt JWT token
      const secretKey = 'done-by-zkzk'; // Same secret key used for encryption
      const decryptedBytes = CryptoJS.AES.decrypt(isLoggedIn, secretKey);
      const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);
      if ((window.location.href.split('/').pop() != 'Blogs')) {
        request = request.clone({
          setHeaders: {

            Authorization: `Bearer ${decryptedToken}`
          }
        });

      }
      if ((window.location.href.split('/').pop() == 'Blogs') && request.method == 'POST') {
        request = request.clone({
          setHeaders: {

            Authorization: `Bearer ${decryptedToken}`
          }
        });

      }


    }
    return next.handle(request);
  }
}


