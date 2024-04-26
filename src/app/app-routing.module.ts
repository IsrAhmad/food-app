import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './core/interceptors/Guards/auth.guard';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  //TODO: put forgot password, reset, register here? I'm not sure lessa (session 3 - part2_app layout "6:05")
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  //TODO: We used AthGuard in the next line for Dashboard Module - So that no one can access the dshboard without a Token
  { path: 'dashboard', canActivate: [AuthGuard], loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  //TODO: In the case of logging in and now you can access the dshboard, you will have to pass by the AdminGuard and UserGuard so we would know which content to redirect you to
  //TODO: The dashboard-routing-module.ts's Routes=[] have their own paths that can be activated once either the UserGuard or AdminGuard are passed
  { path: '**', component: AuthComponent },
  // {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  // { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
