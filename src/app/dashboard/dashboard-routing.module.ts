import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { adminGuard } from '../core/interceptors/Guards/admin.guard';
import { userGuard } from '../core/interceptors/Guards/user.guard';
import { authGuard } from '../core/interceptors/Guards/auth.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    {path: 'admin', canActivate: [adminGuard], loadChildren: () => import('../admin/admin.module').then(n => n.AdminModule)},
    {path: 'user', canActivate: [adminGuard], loadChildren: () => import('../user/user.module').then(n => n.UserModule)},
    {path: 'auth', canActivate: [adminGuard], loadChildren: () => import('../auth/auth.module').then(n => n.AuthModule)}


  ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
