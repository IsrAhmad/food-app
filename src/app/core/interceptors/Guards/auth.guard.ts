import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _Router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.checkLoggedIn();
  }

  checkLoggedIn(): boolean {
    if(localStorage.getItem('userToken') !== null) {
      return true;
    } else {
      this._Router.navigate(['/auth']); // Navigate to '/auth' if user is not logged in
      return false;
    }
  }
}




// import { Injectable } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';

// //TODO: import routing so that we can navigate back to the login page, which is 'auth', in the case of a wrong password when the token is returned == null



// export const authGuard: CanActivateFn = (route, state) => {

//   //TODO: constructor(private _Router:Router) { } //This line would work on Angular 15

// //TODO: the condition can be changed for a variable later, but this is basically the idea
//   if(localStorage.getItem('userToken') !== null ) {
//     return true;
//   }
//   else {
//     //TODO: this._Router.navigate('/auth'); //This line would work on Angular 15
//     return false;
//   }

//   return true;
// };
