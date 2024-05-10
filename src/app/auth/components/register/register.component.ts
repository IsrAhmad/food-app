import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { VerifyComponent } from '../verify/verify.component';

import { VerifyService } from '../../services/verify.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  imgSrc: any;

  registerForm = new FormGroup({
    userName: new FormControl(null, [Validators.required,]),
    email: new FormControl(null, [
      Validators.minLength(12),
      Validators.maxLength(100),
      Validators.email,
      Validators.required,
    ]),
    country: new FormControl(null),
    phoneNumber: new FormControl(null),
    profileImage: new FormControl(null),
    password: new FormControl(null, [
      Validators.pattern(/^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&*_=+-]).{8,16}$/),
      // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*()-_+=])[A-Za-zd!@#$%^&*()-_+=]{6,}$'),
      Validators.required,
    ]),
    confirmPassword: new FormControl(null),
  });
  // dialog: any;
  // public dialog: MatDialog
  // , private _VerifyService: VerifyService,
  //
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _VerifyService: VerifyService,
    public dialog: MatDialog

  ) {}

  categryItem: string = '';

  ngOnInit(): void {}

  hide: boolean = true;
  hideConfirm: boolean = true;

  files: File[] = [];

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);

    console.log(this.files);

    this.imgSrc = this.files[0];
    console.log( this.imgSrc );

  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onRegister(data: FormGroup) {
    console.log(data.value);
    console.log(data.value);

    let myData = new FormData();

    myData.append('userName', data.value.userName);
    myData.append('email', data.value.email);
    myData.append('phoneNumber', data.value.phoneNumber);
    myData.append('country', data.value.country);
    myData.append('password', data.value.password);
    myData.append('confirmPassword', data.value.confirmPassword);
    myData.append('profileImage', this.imgSrc);

    this._AuthService.register(myData).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }

  openDialog(): void {
    // debugger
    const dialogRef = this.dialog.open(VerifyComponent, {
      data: { name: this.categryItem },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  goLogin() {
    this._Router.navigate(['auth']);
    console.log('LOGIN PAGE');
  }
}
