import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  changePasswordForm = new FormGroup({
    oldPassword: new FormControl(null, [
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*()-_+=])[A-Za-zd!@#$%^&*()-_+=]{6,}$'
      ),
      Validators.required,
    ]),
    newPassword: new FormControl(null, [
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*()-_+=])[A-Za-zd!@#$%^&*()-_+=]{6,}$'
      ),
      Validators.required,
    ]),
    confirmNewPassword: new FormControl(null, [
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*()-_+=])[A-Za-zd!@#$%^&*()-_+=]{6,}$'
      ),
      Validators.required,
    ]),
  });

  hideOld: boolean = true;
  hideNew: boolean = true;
  hideConfirm: boolean = true;

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    public dialog: MatDialog
  ) {}

  onChangePassword(data: FormGroup) {
    this._AuthService.changePassword(data.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: () => {},
      complete: () => {
        this._Router.navigate(['dashboard']);
      },
    });
  }
}
