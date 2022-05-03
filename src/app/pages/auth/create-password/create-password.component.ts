import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/core/classes/validators/must-match';
import { AuthService } from 'src/app/core/services/api-calls/auth.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html'
})
export class CreatePasswordComponent implements OnInit {
  btnText='Save Password';
  formData: FormGroup;
  isProcessing = false;
  hidePassword = true;
  submitted = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      password: ['', Validators.required, Validators.minLength(6)],
      password_confirm: ['', Validators.required],
    }, { validator: MustMatch('password', 'password_confirm')});
  }

  onSubmit(data){
    this.validateData();
    this.isProcessing = true;
    this.authService.createNewPassword(data, (error, result)=> {
      this.isProcessing = false;
      if(result !== null && result.status_code === "100"){
        swal.fire('Password Reset', result.message, 'success');
        setTimeout(() => {
          this.router.navigate(['/auth/login'], )
        }, 2500);
      }
    })
  }
  validateData() {
    this.submitted = true;
    // return here if data is invalid
    if (this.formData.invalid) {
      return;
    }
  }
  // convenience getter for easy access to form fields
  get f() { return this.formData.controls; }


}
