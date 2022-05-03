import { networkResponseSchema } from './stores/network-response-store';
import { DBConfig } from 'ngx-indexed-db';
import { localStoreNames } from './local-db-store-names';
import { productStoreSchema } from './stores/product-store';

export const dbName = 'Ecom';
export const dbConfig: DBConfig = {
  name: dbName,
  version: 7,
  objectStoresMeta: [
    {
    store: localStoreNames.product_store,
    storeConfig: { keyPath: 'front_end_id', autoIncrement: true },
    storeSchema: productStoreSchema
  }, {
    store: localStoreNames.presisted_product_store,
    storeConfig: { keyPath: 'front_end_id', autoIncrement: true },
    storeSchema: networkResponseSchema
  }
  ]
};
