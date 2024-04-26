import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AdminGuard } from '../core/interceptors/Guards/admin.guard';
import { UserGuard } from '../core/interceptors/Guards/user.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    //TODO: I have to put the guards here so they can chech the roles of each user wether they are SystemUser or SuperAdmin
    {path: 'admin', canActivate: [AdminGuard], loadChildren: () => import('../admin/admin.module').then(n => n.AdminModule)},
    {path: 'user', canActivate: [UserGuard], loadChildren: () => import('../user/user.module').then(n => n.UserModule)},
    // {path: 'auth', canActivate: [AuthGuard], loadChildren: () => import('../auth/auth.module').then(n => n.AuthModule)}


  ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
