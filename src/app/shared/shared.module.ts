import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SharedComponent } from './shared.component';



@NgModule({
  declarations: [SharedComponent],
  imports: [
    CommonModule,
    NgxDropzoneModule
  ],
  exports: [
    NgxDropzoneModule
  ]
})
export class SharedModule { }
