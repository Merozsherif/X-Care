import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.authService.currentUserValue;
    // console.log("Current User:", user);

    if (user && user.doctor_id) {
      return true; // User is a doctor, allow access
    } else if (user && user.profile_id) {
      if (state.url !== '/profile/profile') {
        // console.log("Redirecting to profile");
        this.router.navigate(['/profile']);
        return false;
      }
      return true; // Allow access to profile route
    } else {
      console.log("Redirecting to Home");
      this.router.navigate(['/Home']);
      return false;
    }
  }
}
