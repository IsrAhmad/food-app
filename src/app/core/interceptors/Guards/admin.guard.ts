import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private _Router: Router, private _AuthService:AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.checkLoggedIn();
  }

  checkLoggedIn(): boolean {
    const role = this._AuthService.role ;
    if(localStorage.getItem('userToken') !== null && role == 'SuperAdmin') {
      return true;
    } else {
      this._Router.navigate(['/auth']); // Navigate to '/auth' if user is not logged in
      return false;
    }
  }
}
