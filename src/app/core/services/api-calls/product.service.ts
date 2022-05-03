import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ICallback } from '../../classes/callback.interface';
import { ConstantValueService } from '../helpers/constant-values.service';
import { DataProviderService } from '../helpers/data-provider.service';
import { EventManagerService } from '../helpers/event-manager.service';
import { UtilService } from '../helpers/util.service';
import { ProductsLocalDbCallsService } from '../local-calls/products-local-db-calls.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private constantValues: ConstantValueService,
    private dataProvider: DataProviderService,
    private productsLocalService: ProductsLocalDbCallsService,
    private eventManageService: EventManagerService,
    private utilService: UtilService,
    private toast: ToastrService,
  ) {}
  /**
 * Get all my products
 * @param filterParams Filter params
 * @param callback ICallback function that returns an error or result
 */
  getProductsLocalServer(callback: ICallback) {
    //Set data array to empty
    let oldData: any[];
    //Locally get existing data from LocalDB
    this.productsLocalService.getProducts((_error, _result) => {
      callback(_error, _result);
      //First check if client is online and make network call
      if (this.eventManageService.isOnline) {
        this.dataProvider.getDataNoToken(this.constantValues.FETCH_PRODUCTS_ENDPOINT).subscribe((result) => {
          console.log(result, 'FETCHED SERVER DATA')
          //Check and fetch next url data
          if (result !== null && result.next !== null && result.next !== '') {
            this.utilService.loadAllDataWithNextURL(result, (err, res) => {
              if (res !== null) {
                const remoteData: any[] = result;
                //add new url data to old data
                oldData = oldData.concat(...[remoteData])
                console.log(oldData, 'CONCATINATED DATA')
                //Clear localDB storage data
                this.productsLocalService.clearNewPersistProducts((er, rs) => {
                  console.log(rs, 'PERSIST DTA CLEARDED')
                  //Now add the concatinatd data (existing localDB + New data fetch from server(both next url & server data)) to localDB
                  oldData.forEach(productData => {
                    console.log(productData, 'PERSIST productData ')
                    this.productsLocalService.postNewPersistedProdcts(productData, (e, r) => { console.log('got here', e) });
                  });
                  //Now return the updated localDB data to client
                  this.productsLocalService.getProducts((finalError, finalResult) => {
                    callback(finalError, finalResult);
                    console.log(finalResult, 'FINAL RESULTS')
                  });
                });
              }
            });
          } else {
            //there is no next url so return all data fetched from server
            oldData = result;
            console.log(oldData, 'RETURNING OLD DATA')
            this.productsLocalService.clearNewPersistProducts((er, rs) => {
              console.log(er, 'ERROR OF CLEARING LOCALDB')
              console.log(rs, 'RESULT OF LOCALDB')
              //create new data to localDB
              oldData.forEach(productData => {
                console.log(productData, 'CREATING NEW DATA TO LOCALDB')
                this.productsLocalService.postNewPersistedProdcts(productData, (e, r) => { });
              });
              //Now return the updated localDB data to client
              this.productsLocalService.getProducts((finalError, finalResult) => {
                callback(finalError, finalResult);
              });
            });
          }
        }, error => {
          callback(error, null);
          // this.notificationService.snackBarErrorMessage(error.detail);
        });
      }
    });
  }
  /**
 * Submit product to server
 * @data param data to submit to server
 * @callback ICallback function that returns an error or result
*/
  createProduct(data, callback: ICallback) {
    this.dataProvider.postData(this.constantValues.CREATE_PRODUCT_ENDPOINT, data).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      //   this.notificationService.snackBarErrorMessage(error.message);
    });
  }
  /**
  * Get All products from server
  * @callback ICallback function that returns an error or result
  */
  fetchProducts(callback: ICallback) {
    this.dataProvider.getDataNoToken(this.constantValues.FETCH_PRODUCTS_ENDPOINT).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      //   this.notificationService.snackBarErrorMessage(error.message);
    });
  }
  /**
* Get a single product from server
* @param id ID of product to fetch
* @callback ICallback function that returns an error or result
*/
  fetchProductDetails(id: string, callback: ICallback) {
    this.dataProvider.getDataNoToken(this.constantValues.PRODUCT_DETAIL_ENDPOINT + id).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      //   this.notificationService.snackBarErrorMessage(error.message);
    });
  }
  /**
  * Get All product categories from server
  * @callback ICallback function that returns an error or result
  */
  fetchCategories(callback: ICallback) {
    this.dataProvider.getDataNoToken(this.constantValues.FETCH_CATEGORIES_ENDPOINT).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      //   this.notificationService.snackBarErrorMessage(error.message);
    });
  }
  /**
* Get single category from server
* @id param id of category to fetch
* @callback ICallback function that returns an error or result
*/
  fetchCategoryDetails(id, callback: ICallback) {
    this.dataProvider.getDataNoToken(this.constantValues.CATEGORY_DETAIL_ENDPOINT + id).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      //   this.notificationService.snackBarErrorMessage(error.message);
    });
  }
  /**
  * Get All payment from server
  * @callback ICallback function that returns an error or result
  */
  getPayments(callback: ICallback) {
    this.dataProvider.getData(this.constantValues.FETCH_PAYMENTS_ENDPOINT).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      //   this.notificationService.snackBarErrorMessage(error.message);
    });
  }
  /**
  * Get single payment detail from server
  * @id param id of payment
  * @callback ICallback function that returns an error or result
  */
  getPaymentDetail(id, callback: ICallback) {
    this.dataProvider.getData(this.constantValues.PAYMENT_DETAIL_ENDPOINT + id).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      //   this.notificationService.snackBarErrorMessage(error.message);
    });
  }

}