import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ICallback } from '../../classes/callback.interface';
import { ConstantValueService } from '../helpers/constant-values.service';
import { DataProviderService } from '../helpers/data-provider.service';
import { UtilService } from '../helpers/util.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private constantValues: ConstantValueService,
    private dataProvider: DataProviderService,
    private utilService: UtilService,
    private toast: ToastrService,
  ) { }
  /**
* Submit product to server
* @data param data to submit to server
* @callback ICallback function that returns an error or result
*/
  makePayment(data, callback: ICallback) {
    this.dataProvider.postData(this.constantValues.CREATE_PRODUCT_ENDPOINT, data).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      //   this.notificationService.snackBarErrorMessage(error.message);
    });
  }
}
