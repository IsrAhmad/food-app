import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavRoutingModule } from './fav-routing.module';
import { FavComponent } from './fav.component';


@NgModule({
  declarations: [
    FavComponent
  ],
  imports: [
    CommonModule,
    FavRoutingModule
  ]
})
export class FavModule { }
