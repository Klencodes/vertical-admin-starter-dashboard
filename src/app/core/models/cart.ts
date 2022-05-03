import { ColorModel, ProductModelServer, VariationModel } from "./product";

export interface CartModelServer {
  data: [{
    product: ProductModelServer,
    numInCart: number,
    variation: VariationModel,
    color: ColorModel
  }],
  total: number,
  // couponData: CouponModelServer
}

export interface CartModelClient {
  prodData: [{
    product_id: number,
    incart: number,
    variation_id: number,
    color_id: number
  }],
  total: number

}

export interface CouponModelServer{
  amount_paid: number;
  amount_saved: number;
  coupon_value: number;
  coupon_type: string;

}