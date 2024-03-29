﻿import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalAuthService } from '../services/local-calls/local-auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private localAuthService: LocalAuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.localAuthService.userObj
        if (user.token) {
            // check if route is restricted by role
            if (route.data['user_type'] && !route.data['user_type'].includes(user.user_type)) {
                // role not authorized so redirect to home page
                this.router.navigate(['/' ]);
                return false;
            }
            // authorized so return true
            return true;
        }
        // not logged in so redirect to login page with the return url 
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}