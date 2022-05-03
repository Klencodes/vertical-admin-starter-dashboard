import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserType } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/api-calls/auth.service';
import { LocalAuthService } from 'src/app/core/services/local-calls/local-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isProcessing = false;
  hidePassword = true;
  btnText = 'login';
  submitted = false;

  constructor(
    private authService: AuthService,
    private localAuthService: LocalAuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    
    if (this.localAuthService.isLogedIn) {
      // this.router.navigate(['/dashboard']);
    }
  }

  validateData() {
    this.submitted = true;
    // this.isProcessing = true;

    // return here if data is invalid
    if (this.loginForm.invalid) {
      return;
    }
  }
  /**
   *Login a user and redirect user to dashboard
   * @param data login credential(email & password)
   */
  onSubmit(data) {
    this.validateData();
    // data.player_id = this.localAuthService.getNotificationToken;
    this.isProcessing = true;
    this.authService.login(data, (error, result) => {
      this.isProcessing = false;
      if (result !== null && result.status_code === '100') {
        this.localAuthService.increaseLoggedInCount();
        if (result.data.user_type === UserType.ADMIN) {
          this.router.navigate(['/']);
        } else {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/auth/login';
          this.router.navigateByUrl(returnUrl);
        }
      }
    });
  }

  get validate() {
    return this.loginForm.controls;
  }

}
