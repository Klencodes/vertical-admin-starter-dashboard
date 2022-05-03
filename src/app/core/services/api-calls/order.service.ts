import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ICallback } from '../../classes/callback.interface';
import { ConstantValueService } from '../helpers/constant-values.service';
import { DataProviderService } from '../helpers/data-provider.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private constantValues: ConstantValueService,
    private dataProvider: DataProviderService,
    private toast: ToastrService,
    ) { }
    /**
  * Get redeem coupon from server
  * @data param
  * @callback ICallback function that returns an error or result
  */
     claimCoupon(data, callback: ICallback) {
      this.dataProvider.postData(this.constantValues.CLAIM_COUPON_ENDPOINT, data).subscribe(result => {
        callback(null, result);
      }, error => {
        callback(error, null);
        //   this.notificationService.snackBarErrorMessage(error.message);
      });
    }
    /**
   * Make new payment request to server
   * @data param data to submit to server
   * @callback ICallback function that returns an error or result
   */
     createOrder(data, callback: ICallback) {
      this.dataProvider.postData(this.constantValues.CREATE_ORDER_ENDPOINT, data).subscribe(result => {
        callback(null, result);
       }, error => {
         callback(error, null);
           this.toast.error(error.detail);
       });
   }
   /**
   * Get All orders (customer) from server
   * @callback ICallback function that returns an error or result
   */
    fetchOrders(callback: ICallback) {
     this.dataProvider.getData(this.constantValues.FETCH_ALL_ORDERS_ENDPOINT).subscribe(result => {
       callback(null, result);
     }, error => {
         callback(error, null);
         //   this.notificationService.snackBarErrorMessage(error.message);
     });
   }
   /**
   * Get All orders (customer) from server
   * @callback ICallback function that returns an error or result
   */
    getOrders(callback: ICallback) {
     this.dataProvider.getData(this.constantValues.CUSTOMER_ORDERS_ENDPOINT).subscribe(result => {
       callback(null, result);
     }, error => {
         callback(error, null);
         //   this.notificationService.snackBarErrorMessage(error.message);
     });
   }
   /**
   * Get single order(customer) from server
   * @id param id of order to submit to server
   * @callback ICallback function that returns an error or result
   */
    getOrderDetail(id, callback: ICallback) {
     this.dataProvider.getData(this.constantValues.ORDER_DETAIL_ENDPOINT + id).subscribe(result => {
       callback(null, result);
     }, error => {
         callback(error, null);
         //   this.notificationService.snackBarErrorMessage(error.message);
     });
   }
 
}
