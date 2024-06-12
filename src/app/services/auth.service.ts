import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode'
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  refreshuser = new BehaviorSubject<boolean>(
    false
  );

  constructor(private router: Router, private http: HttpClient) {
    const accessToken = localStorage.getItem('access_token');
    const secretKey = 'done-by-zkzk'; // Same secret key used for encryption
    const decryptedBytes = accessToken ? CryptoJS.AES.decrypt(accessToken, secretKey) : null;
    const decryptedToken = decryptedBytes ? decryptedBytes.toString(CryptoJS.enc.Utf8) : null;
    // Decode the access token if it exists, otherwise set an empty object
    const decodedToken = decryptedToken ? JSON.stringify(jwtDecode(decryptedToken)) : '{}';
  
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(decodedToken));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    if (this.currentUserSubject.value != null) { return this.currentUserSubject.value }
  }

  getUser(form: any) {
    return this.http.post(`https://ai-x-care.future-developers.cloud/accounts/login/`, form, { headers: this.getCsrfHeaders() });
  }

  createUser(form: any) {
    return this.http.post(`https://ai-x-care.future-developers.cloud/accounts/register/`, form, { headers: this.getCsrfHeaders() });
  }

  // Function to get CSRF headers
  private getCsrfHeaders(): HttpHeaders {
    const csrfToken = this.getCookie('csrftoken');
    return new HttpHeaders({
      'X-CSRFToken': csrfToken
    });
  }

  // Function to get CSRF token from cookie
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
}


// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { BehaviorSubject, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   public currentUserSubject: BehaviorSubject<any>;
//     public currentUser: Observable<any>;
//     refreshuser = new BehaviorSubject<boolean>(
//       false
//     );
//     constructor(private router: Router,private http: HttpClient) {
//       this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem(`jwt`) || '{}'));
//       this.currentUser = this.currentUserSubject.asObservable();
//     }
//     public get currentUserValue(): any {
//       if(this.currentUserSubject.value != null) { return this.currentUserSubject.value }
//     }

//   getUser(form:any){
//     return this.http.post(`https://ai-x-care.future-developers.cloud/accounts/login/` , form)
//    }
//    createUser(form:any){
//     return this.http.post(`https://ai-x-care.future-developers.cloud/accounts/register/` , form)
//    }
// }

