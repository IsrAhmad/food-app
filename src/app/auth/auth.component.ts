import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  showPassword: boolean = false;
  password: string = '';
  email: string = '';
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  // constructor(private _Authentication: Authentication) {}
}
