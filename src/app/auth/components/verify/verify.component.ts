import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent {

  verifyForm = new FormGroup({
    email: new FormControl(null),
    code: new FormControl(null),
  });


  constructor(private _AuthService: AuthService,
    public dialogRef: MatDialogRef<VerifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}


  onVerify(data: FormGroup) {
    // debugger
    this._AuthService.verify(data.value).subscribe({
      next: (res) => {
        console.log(res);
      }
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
