import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/api-calls/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authHeader = request.headers.get('Authorization');
    if (authHeader !== undefined && authHeader !== null && authHeader !== '' && authHeader === 'Bearer') {
      const cloneReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + this.authService.userValue.token)
      });
      return next.handle(cloneReq);
    }
    return next.handle(request);
  }
}
