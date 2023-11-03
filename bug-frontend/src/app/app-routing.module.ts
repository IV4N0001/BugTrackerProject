import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { SignComponent } from './components/sign/sign.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RequestPwdComponent } from './components/request-pwd/request-pwd.component';
import { RestorePwdComponent } from './components/restore-pwd/restore-pwd.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sign',
    component: SignComponent
  },
  {
    path: 'requestPwd',
    component: RequestPwdComponent
  },
  {
    path: 'restorePwd',
    component: RestorePwdComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '**', redirectTo: 'login', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
