import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetPasswordForm = new FormGroup({
    email: new FormControl(null, [
      Validators.minLength(12),
      Validators.maxLength(100),
      Validators.email,
      Validators.required,
    ]),
    password: new FormControl(null, [
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*()-_+=])[A-Za-zd!@#$%^&*()-_+=]{6,}$'
      ),
      Validators.required,
    ]),
    confirmPassword: new FormControl(null, [
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*()-_+=])[A-Za-zd!@#$%^&*()-_+=]{6,}$'
      ),
      Validators.required,
    ]),
    seed: new FormControl(null),
  });

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    public dialog: MatDialog
  ) {}


  hide: boolean = true;
  hideConfirm: boolean = true;


  onResetPassword(data: FormGroup) {
    this._AuthService.reset(data.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: () => {},
      complete: () => {
        this._Router.navigate(['auth']);
      },
    });
  }


}
