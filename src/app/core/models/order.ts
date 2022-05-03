export class OrderModel {
  id: number;
  new_order_id: string;
  ordered: boolean;
  amount_paid: string;
  amount_saved: number;
  date_created: string;
  date_updated: string;
  order_items: Item[]
  order_status: string;
  total_price: string;
  user: string;
}

export class Item {
  color: string;
  variation: string;
  product: string;
  price: string;
  item_total: string;
  incart: string;
  image: string;
  date_created: string;
  refund_granted: boolean;
  refund_requested: boolean;
}