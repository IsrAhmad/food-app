import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  submitEmail = new FormGroup({
    email: new FormControl(null, [
      Validators.minLength(12),
      Validators.maxLength(100),
      Validators.email,
      Validators.required,
    ]),
  });

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    public dialog: MatDialog
  ) {}


  onSendEmail(data: FormGroup) {
    this._AuthService.request(data.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: () => {},
      complete: () => {
        this._Router.navigate(['auth/register']);
      },
    });
  }

  goReset() {
    this._Router.navigate(['auth/reset-password']);
  }

}
