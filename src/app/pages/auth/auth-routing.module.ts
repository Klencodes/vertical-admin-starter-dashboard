import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'Login'} },
  { path: 'register', component: RegisterComponent, data: { title: 'Register'} },
  { path: 'verify-email', component: VerifyEmailComponent, data: { title: 'Verify Email'} },
  { path: 'forgot-password', component: ForgotPassComponent, data: { title: 'Forgot Password'} },
  { path: 'create-password', component: CreatePasswordComponent, data: { title: 'Create Password'} },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
