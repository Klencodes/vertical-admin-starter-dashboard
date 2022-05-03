export class ProductModelServer {
  
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  brand: string;
  buy_price: number;
  sell_price: number;
  discount_price: string;
  discount_value: string;
  quantity: number;
  date_created: string;
  date_updated: string;
  variations: VariationModel
}

export class VariationModel{
  id: number;
  attachment: string;
  buy_price: string;
  sell_price: string;
  quantity: number;
  value: string;
  colors: ColorModel[]
}
  
export class ColorModel{
  id: number;
  attachment: string;
  value: string;
  code: string;
}
  
  export class ServerResponse  {
    count: number;
    const: string;
    products: ProductModelServer[]
  };
  