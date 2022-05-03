import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { MaterialModule } from 'src/app/core/modules/material.module';
import { SharedDirectivesModule } from 'src/app/core/directives/shared-directives-module';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerifyEmailComponent,
    ForgotPassComponent,
    CreatePasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedDirectivesModule
  ]
})
export class AuthModule { }
