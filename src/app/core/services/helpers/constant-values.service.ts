import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConstantValueService {
  id;
  constructor() { }

  get BASE_URL() { return environment.BASE_URL; }
  get APP_NAME() { return 'Test App'}
  get LOCAL_STORAGE_SAVE_ERROR_MESSAGE() { return 'Error occured while processing request'}

  get AUTH_BASE() { return 'auth/'}
  get PRODUCTS_BASE() { return 'products/'}
  get PAYMENTS_BASE() { return 'payments/'}

  get FETCH_USERS_ADDRESSES_ENDPOINT() {return this.AUTH_BASE + 'fetch_all_addresses/' }
  get USER_ADDRESSES_ENDPOINT() {return this.AUTH_BASE + 'user_addresses/' }
  get CREATE_ADDRESS_ENDPOINT() {return this.AUTH_BASE + 'add_address/' }
  get TOKEN_FRESH_ENDPOINT() {return this.AUTH_BASE + 'token_refresh/' }

  get REGISTER_VIA_EMAIL_ENDPOINT() {return this.AUTH_BASE + 'register_via_email/' }
  get VERIFY_EMAIL_ENDPOINT() {return this.AUTH_BASE + 'verify_email/?token='}
  get EMAIL_LOGIN_ENDPOINT() {return this.AUTH_BASE + 'email_login/' }
  get LOGOUT_ENDPOINT() {return this.AUTH_BASE + 'logout/' }
  get REQUEST_PASSWORD_RESET_ENDPOINT() {return this.AUTH_BASE + 'request_password_reset_email/' }
  get CHECK_PASSWORD_RESET_TOKEN_ENDPOINT() {return this.AUTH_BASE + 'check_token_uidb64/' } //'check_password_reset_token/<uidb64>/<token>/'
  get CREATE_NEW_PASSWORD_ENDPOINT() {return this.AUTH_BASE + 'create_new_password/' }
  
  get SEND_OTP_ENDPOINT() {return this.AUTH_BASE + 'send_opt/' }
  get VALIDATE_OTP_ENDPOINT() {return this.AUTH_BASE + 'validate_otp/' }
  get REGISTER_VIA_PHONE_ENDPOINT() {return this.AUTH_BASE + 'register_via_phone/' }
  get PHONE_LOGIN_ENDPOINT() {return this.AUTH_BASE + 'phone_login/' }
  get REQUEST_PASSWORD_RESET_OTP_ENDPOINT() {return this.AUTH_BASE + 'request_password_reset_otp/' }
  get VALIDATE_PASSWORD_RESET_OTP_ENDPOINT() {return this.AUTH_BASE + 'validate_password_reset_otp/' }
  get RESET_PASSWORD_PHONE_ENDPOINT() {return this.AUTH_BASE + 'reset_password_phone/' }
  get CHANGE_PASSWORD_ENDPOINT() {return this.AUTH_BASE + 'change_password/' }

  get GET_USER() {return this.AUTH_BASE + 'get_user/' }

  get FETCH_BANNERS_ENDPOINT() { return this.PRODUCTS_BASE + 'fetch_banners/' }
  get BANNER_DETAIL_ENDPOINT() { return this.PRODUCTS_BASE + 'banner_detail/' }
  get DELETE_BANNER_ENDPOINT() { return this.PRODUCTS_BASE + 'delete_banner/' }
  get CREATE_BANNER_ENDPOINT() { return this.PRODUCTS_BASE + 'create_banner/' }
  get UPDATE_BANNER_ENDPOINT() { return this.PRODUCTS_BASE + 'update_banner/' }

  get FETCH_BRANDS_ENDPOINT() { return this.PRODUCTS_BASE + 'fetch_brands/' }
  get BRAND_DETAIL_ENDPOINT() { return this.PRODUCTS_BASE + 'brand_detail/' }
  get DELETE_BRAND_ENDPOINT() { return this.PRODUCTS_BASE + 'delete_brand/' }
  get CREATE_BRAND_ENDPOINT() { return this.PRODUCTS_BASE + 'create_brand/' }
  get UPDATE_BRAND_ENDPOINT() { return this.PRODUCTS_BASE + 'update_brand/' }

  get FETCH_MAINCATEGORIES_ENDPOINT() { return this.PRODUCTS_BASE + 'main_categories/' }
  get MAINCATEGORY_DETAIL_ENDPOINT() { return this.PRODUCTS_BASE + 'main_category_detail/' }
  get DELETE_MAINCATEGORY_ENDPOINT() { return this.PRODUCTS_BASE + 'delete_main_category/' }
  get CREATE_MAINCATEGORY_ENDPOINT() { return this.PRODUCTS_BASE + 'create_main_category/' }
  get UPDATE_MAINCATEGORY_ENDPOINT() { return this.PRODUCTS_BASE + 'update_main_category/' }

  get FETCH_CATEGORIES_ENDPOINT() { return this.PRODUCTS_BASE + 'categories/' }
  get CATEGORY_DETAIL_ENDPOINT() { return this.PRODUCTS_BASE + 'category_detail/' }
  get DELETE_CATEGORY_ENDPOINT() { return this.PRODUCTS_BASE + 'delete_category/' }
  get CREATE_CATEGORY_ENDPOINT() { return this.PRODUCTS_BASE + 'create_category/' }
  get UPDATE_CATEGORY_ENDPOINT() { return this.PRODUCTS_BASE + 'update_category/' }

  get FETCH_SUBCATEGORIES_ENDPOINT() { return this.PRODUCTS_BASE + 'sub_categories/' }
  get SUBCATEGORY_DETAIL_ENDPOINT() { return this.PRODUCTS_BASE + 'sub_category_detail/' }
  get DELETE_SUBCATEGORY_ENDPOINT() { return this.PRODUCTS_BASE + 'delete_sub_category/' }
  get CREATE_SUBCATEGORY_ENDPOINT() { return this.PRODUCTS_BASE + 'create_sub_category/' }
  get UPDATE_SUBCATEGORY_ENDPOINT() { return this.PRODUCTS_BASE + 'update_sub_category/' }
  
  get FETCH_PRODUCTS_ENDPOINT() { return this.PRODUCTS_BASE + 'fetch_all_products/' }
  get CREATE_PRODUCT_ENDPOINT() { return this.PRODUCTS_BASE + 'create_product/' }
  get UPDATE_PRODUCT_ENDPOINT() { return this.PRODUCTS_BASE + 'update_product/' }
  get PRODUCT_DETAIL_ENDPOINT() { return this.PRODUCTS_BASE + 'product_detail/' }
  get DELETE_PRODUCT_ENDPOINT() { return this.PRODUCTS_BASE + 'delete_product/' }
  get INCREASE_PRODUCT_STOCK_ENDPOINT() { return this.PRODUCTS_BASE + 'increase_stock/' }
  get DECREASE_PRODUCT_STOCK_ENDPOINT() { return this.PRODUCTS_BASE + 'decrease_stock/' }
  
  get CREATE_VARIRENT_TITLE_ENDPOINT() { return this.PRODUCTS_BASE + 'create_varient_title/' }
  get FETCH_VARIRENT_TITLES_ENDPOINT() { return this.PRODUCTS_BASE + 'fetch_varient_titles/' }
  get VARIRENT_TITLE_DETAIL_ENDPOINT() { return this.PRODUCTS_BASE + 'varient_title_detail/' }
  get UPDATE_VARIRENT_TITLE_ENDPOINT() { return this.PRODUCTS_BASE + 'update_varient_title/' }
  get DELETE_VARIRENT_TITLE_ENDPOINT() { return this.PRODUCTS_BASE + 'delete_varient_title/' }
  
  get FETCH_PRODUCT_COLORS_ENDPOINT() { return this.PRODUCTS_BASE + 'fetch_colors/' }

  get FETCH_PRODUCT_COLOR_MEDIA_ENDPOINT() { return this.PRODUCTS_BASE + 'fetch_product_color_media/' }
  get PRODUCT_COLOR_MEDIA_DETAIL_ENDPOINT() { return this.PRODUCTS_BASE + 'product_color_media_detail/' }
  get DELETE_PRODUCT_COLOR_MEDIA_ENDPOINT() { return this.PRODUCTS_BASE + 'delete_product_color_media/' }
  get CREATE_PRODUCT_COLOR_MEDIA_ENDPOINT() { return this.PRODUCTS_BASE + 'create_product_color_media/' }
  get UPDATE_PRODUCT_COLOR_MEDIA_ENDPOINT() { return this.PRODUCTS_BASE + 'update_product_color_media/' }
  
  
  get FETCH_PRODUCT_SPECIFICATIONS_ENDPOINT() { return this.PRODUCTS_BASE + 'product_specifications/' }
  get PRODUCT_SPECIFICATION_DETAIL_ENDPOINT() { return this.PRODUCTS_BASE + 'product_specification_detail/' }
  get DELETE_PRODUCT_SPECIFICATION_ENDPOINT() { return this.PRODUCTS_BASE + 'delete_product_specification/' }
  get CREATE_PRODUCT_SPECIFICATION_ENDPOINT() { return this.PRODUCTS_BASE + 'create_product_specification/' }
  get UPDATE_PRODUCT_SPECIFICATION_ENDPOINT() { return this.PRODUCTS_BASE + 'update_product_specification/' }
  
  
  get FETCH_PRODUCT_SIZIES_ENDPOINT() { return this.PRODUCTS_BASE + 'product_varients/' }
  get PRODUCT_SIZE_DETAIL_ENDPOINT() { return this.PRODUCTS_BASE + 'product_varient_detail/' }
  get DELETE_PRODUCT_SIZE_ENDPOINT() { return this.PRODUCTS_BASE + 'delete_product_varient/' }
  get CREATE_PRODUCT_SIZE_ENDPOINT() { return this.PRODUCTS_BASE + 'create_product_varient/' }
  get UPDATE_PRODUCT_SIZE_ENDPOINT() { return this.PRODUCTS_BASE + 'update_product_varient/' }
  
  get FETCH_PAYMENTS_ENDPOINT() { return this.PAYMENTS_BASE + 'fetch_payments/' }
  get PAYMENT_DETAIL_ENDPOINT() { return this.PAYMENTS_BASE + 'payment_detail/' }
  get NEW_PAYMENT_ENDPOINT() { return this.PAYMENTS_BASE + 'new_payment/' }
  get UPDATE_PAYMENT_STATUS_ENDPOINT() { return this.PAYMENTS_BASE + 'update_payment_status/' }
  
  get FETCH_ALL_ORDERS_ENDPOINT() { return this.PRODUCTS_BASE + 'fetch_all_orders/' }
  get FETCH_ORDER_DETAIL_ENDPOINT() { return this.PRODUCTS_BASE + 'fetch_order_detail/' }
  get CUSTOMER_ORDERS_ENDPOINT() { return this.PRODUCTS_BASE + 'customer_orders/' }
  get ORDER_DETAIL_ENDPOINT() { return this.PRODUCTS_BASE + 'order_detail/' }
  get CREATE_ORDER_ENDPOINT() { return this.PRODUCTS_BASE + 'create_order/' }
  
  get FETCH_COUPONS_ENDPOINT() { return this.PRODUCTS_BASE + 'fetch_coupons/' }
  get FETCH_USER_COUPONS_ENDPOINT() { return this.PRODUCTS_BASE + 'fetch_user_coupons/' }
  get COUPON_DETAIL_ENDPOINT() { return this.PRODUCTS_BASE + 'coupon_detail/' }
  get CREATE_COUPON_ENDPOINT() { return this.PRODUCTS_BASE + 'create_coupon/' }
  get UPDATE_COUPON_ENDPOINT() { return this.PRODUCTS_BASE + 'update_coupon/' }
  get DELETE_COUPON_ENDPOINT() { return this.PRODUCTS_BASE + 'delete_coupon/' }
  get CLAIM_COUPON_ENDPOINT() { return this.PRODUCTS_BASE + 'claim_coupon/' }
  
}