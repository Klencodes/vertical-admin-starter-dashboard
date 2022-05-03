import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/api-calls/auth.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
})
export class ForgotPassComponent implements OnInit {
  phoneCtrl: FormControl = new FormControl('', [Validators.required] );
  emailCtrl: FormControl = new FormControl('', [Validators.required, Validators.email] );
  isProcessing = false;
  btnText = 'Submit';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() { 
  }
  
  /**
   *Request password reset via email
   * @param email email to submit to server
   */
  onPassResetEmail() {
    this.isProcessing = true;
    this.authService.requestPasswordReset({email: this.emailCtrl.value}, (error, result) => {
      this.isProcessing = false;
      if (result !== null && result.status_code == "100") {
          console.log(result)        
      }
    });
  }

}
