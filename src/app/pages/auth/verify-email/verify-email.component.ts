import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailVerify } from 'src/app/core/enums/enums';
import { AuthService } from 'src/app/core/services/api-calls/auth.service';
import  swal  from 'sweetalert2'
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html'
})
export class VerifyEmailComponent implements OnInit {
  emailStatus: any;
  isProcessing = false
  token: any;
  reset_token: any;
  emailMsg: any;
  uidb64: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { this.token = this.route.snapshot.queryParams['token']
      // this.uidb64 = this.route.snapshot.queryParams['uidb64']
     
  }
  ngOnInit(): void {
    // remove token from url to prevent http referer leakage
    this.router.navigate([], { relativeTo: this.route, replaceUrl: true });

    //VERIFY EMAIL METHOD ==> Get token from route and validate the token
    if(this.token !== null && this.token !== undefined){
      this.isProcessing = true; 
      const token = this.token;
      this.authService.verifyEmail(token, (error, result) =>{
        this.isProcessing = false;
        if(result !== null && result !== undefined){
          this.emailStatus = result.status;
          if(this.emailStatus !== null && this.emailStatus !== undefined && this.emailStatus === EmailVerify.SUCCESS ){
            this.emailMsg = result.success_msg;
            swal.fire('Email Verify', this.emailMsg, 'success');
              setTimeout(() => {
                this.router.navigate(['/auth/login'], )
              }, 2000);
          }
        }
      })
    }

    //VERIFY RESET PASSWORD EMAIL METHOD ==> Get reset_token from route and validate the token
    // if((this.token !== null && this.uidb64 !== null) && (this.token !== undefined && this.uidb64 !== undefined)){
    //   this.isProcessing = true; 
    //   const token = this.reset_token;
    //   const uidb64 = this.uidb64;
    //   this.authService.checkPasswordResetToken(uidb64, token, (error, result) =>{
    //   this.isProcessing = false;
    //     console.log(result, 'RESULT')
    //     this.isProcessing = false;
    //     if(result !== null && result !== undefined){
    //       this.emailStatus = result.status;
    //       if(this.emailStatus !== null && this.emailStatus !== undefined && this.emailStatus === 'SUCCESS' ){
    //         this.router.navigate(['/'], )
    //         this.emailMsg = result.success_msg;
    //           setTimeout(() => {
    //             this.router.navigate(['/auth/create-password'], )
    //           }, 2000);
    //       } 
    //     }
    //   })
    // }
  }
}
