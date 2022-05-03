import { Injectable } from '@angular/core';
import { localStoreNames } from '../../interfaces/local-db-stores/local-db-store-names';
import { ICallback } from '../../classes/callback.interface';
import { ConstantValueService } from '../helpers/constant-values.service';
import { LocalDataProviderService } from '../helpers/local-data-provider.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsLocalDbCallsService {
  shop_id_index = 'shop_id';
  constructor(
    private constantValues: ConstantValueService,
    private localDataProvider: LocalDataProviderService,
    // private notificationService: NotificationsService
  ) { }

  /**
   * Get products persisted in localstorage
   * @param shopId shopId
   * @param callback ICallback function that returns an error or result
   */
  getProducts(callback: ICallback) {

    this.localDataProvider.getData(localStoreNames.presisted_product_store).subscribe(result => {
      console.log(result, 'FETCHING ALL LOCAL DB PRODUCTS')
      // const data: any[] = (result[0] !== null && result[0] !== undefined) ? result[0].data : [];
      const data: any[] = result;
      let queryResult = data;
      // if (shopId !== null && shopId !== undefined && shopId !== '') {
      //   queryResult = data.filter(el => +el.myshop.id === +shopId);
      // }
      callback(null, {results: queryResult, previous: '', next: '', count: queryResult.length, response_code: '100'});
    }, error => {
      callback(error, null);
    });
  }
    /**
   * Get products persisted in localstorage
   * @param shopId shopId
   * @param callback ICallback function that returns an error or result
   */
     getNewPersistedProducts(callback: ICallback) {

      this.localDataProvider.getData(localStoreNames.new_presisted_product_store).subscribe(result => {
        const data: any[] = result;
        let queryResult = data;
        // if (shopId !== null && shopId !== undefined && shopId !== '') {
        //   queryResult = data.filter(el => +el.myshop.id === +shopId);
        // }
        callback(null, {results: queryResult, previous: '', next: '', count: queryResult.length, response_code: '100'});
      }, error => {
        callback(error, null);
      });
    }

  /**
   * Clear products persisted in local storage
   * @param callback ICallback function that returns an error or result
   */
  clearProducts(callback: ICallback) {
    // tslint:disable-next-line: max-line-length
    return this.localDataProvider.clear(localStoreNames.product_store).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      // this.notificationService.error(this.constantValues.APP_NAME, this.constantValues.LOCAL_STORAGE_SAVE_ERROR_MESSAGE);
    });
  }
    /**
   * Clear products persisted in local storage from remote server
   * @param callback ICallback function that returns an error or result
   */
     clearPersistedFromRemote(callback: ICallback) {
      // tslint:disable-next-line: max-line-length
      return this.localDataProvider.clear(localStoreNames.presisted_product_store).subscribe(result => {
        callback(null, result);
      }, error => {
        callback(error, null);
        // this.notificationService.error(this.constantValues.APP_NAME, this.constantValues.LOCAL_STORAGE_SAVE_ERROR_MESSAGE);
      });
    }
  /**
   * Clear products persisted in local storage
   * @param callback ICallback function that returns an error or result
   */
   clearNewPersistProducts(callback: ICallback) {
    // tslint:disable-next-line: max-line-length
    return this.localDataProvider.clear(localStoreNames.new_presisted_product_store).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      // this.notificationService.error(this.constantValues.APP_NAME, this.constantValues.LOCAL_STORAGE_SAVE_ERROR_MESSAGE);
    });
  }
    /**
   * Persist products fetched from remote to localstorage
   * @param data data
   * @param callback ICallback function that returns an error or result
   */
     postPersistProdcts(data: any, callback: ICallback) {
      this.localDataProvider.postData(localStoreNames.presisted_product_store, {data: data}).subscribe(result => {
        callback(null, result);
      }, error => {
        callback(error, null);
      });
    }
  
  /**
   * Persist products fetched from remote to localstorage
   * @param data data
   * @param callback ICallback function that returns an error or result
   */
   postNewPersistedProdcts(data: any, callback: ICallback) {
    this.localDataProvider.postData(localStoreNames.new_presisted_product_store, data).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
    });
  }
  
   /**
   * Update Persisted products fetched from remote to localstorage
   * @param data data
   * @param callback ICallback function that returns an error or result
   */
    updatePersistedProducts(data: any, callback: ICallback) {
      this.localDataProvider.updateWithoutKey(localStoreNames.new_presisted_product_store, data).subscribe(result => {
        callback(null, result);
      }, error => {
        callback(error, null);
      });
    }
}
