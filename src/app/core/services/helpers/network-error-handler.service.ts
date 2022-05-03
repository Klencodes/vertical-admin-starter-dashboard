import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkErrorHandlerService {

  constructor() { }
  /**
   * Handle HttpReseponse errors.
   * @param error HttpErrorResponse
   * @returns JSON data of error with detail key
   */
  handleError(error: HttpErrorResponse) {
    if (error.status === 415) {
      return throwError({ detail: 'An error occurred when processing request.' });
    } else if (error.status === 405) {
      return throwError({ detail: 'An error occurred when processing request.' });
    } else if (error.status === 403) {
      return throwError(error.error);
    } else if (error.status === 404) {
      return throwError(error.error);
    } else if (error.status > 415) {
      return throwError(error.error);
    } else if (error.status === 400) {
      return throwError(error.error);
    }
    return throwError({ detail: 'An error occurred when processing request. Please check your internet connection.' });
  }
}
