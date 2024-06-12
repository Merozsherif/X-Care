import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    const user = this.authService.currentUserValue;
    if (user.profile_id) {
      // User is authenticated, redirect to Home
      this.router.navigate(['/Home']);
      return false;
    }
    // User is not authenticated, allow access
    return true;
  }
}
