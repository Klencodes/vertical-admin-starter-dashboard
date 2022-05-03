import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/core/classes/validators/must-match';
import { UserType } from 'src/app/core/enums/enums';
import { AuthService } from 'src/app/core/services/api-calls/auth.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  emailFormData: FormGroup;
  phoneFormData: FormGroup;
  submitted = false;
  phone_number: FormControl;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.emailFormData = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      user_type: [UserType.CUSTOMER, Validators.required],
      password: ['', Validators.required],
      password_confirm: ['', Validators.required],
    }, {validator: MustMatch('password', 'password_confirm')});

    this.phoneFormData = this.formBuilder.group({
      phone_number: ['', Validators.required],
    })
  }

  validateData(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.emailFormData.invalid) {
      return;
    }
  }

  onSubmit(data){
   this.validateData();
    this.authService.register(data, (error, result)=> {
      if(result !== null && result.status_code === "100"){
        swal.fire('Registration', result.data.detail, 'success');
        // this.router.navigate(['a/'])
      }
    })
  }

  get validate() { return this.emailFormData.controls }
  // get phone_number(){ return this.phone_number}
}
