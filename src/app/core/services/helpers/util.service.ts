import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICallback } from '../../classes/callback.interface';
import { ConstantValueService } from './constant-values.service';
import { DataProviderService } from './data-provider.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  pageChangedObservable!: Observable<any>;
  constructor(
    private constantValues: ConstantValueService,
    private dataProvider: DataProviderService,
    // private notificationService: NotificationsService
  ) { }
   
   /**
   * Load more data with next page url
   * @param nextPageUrl next page url
   * @param requestMethod request method of type RequestMethds
   * @param requestPayload request payload
   * @param callback ICallback function that returns an error or result
   */
    loadAllDataWithNextURL(nextPageUrl: any, callback: ICallback) {

        this.pageChangedObservable = this.dataProvider.httpGetNextPage(nextPageUrl);
      
        this.pageChangedObservable.subscribe(result => {
          if (result) {
            callback(null, result);
            if (result.next !== null && result.next !== '' && result.next !== undefined) {
              this.loadAllDataWithNextURL(result.next, callback);
            } else {
  
            }
          }
        }, error => {
          callback(error, null);
        });
    }
}
