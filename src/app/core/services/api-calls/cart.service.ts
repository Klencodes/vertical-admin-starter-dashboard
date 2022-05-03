import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartModelClient, CartModelServer, CouponModelServer } from 'src/app/core/models/cart';
import { ColorModel, ProductModelServer, VariationModel } from 'src/app/core/models/product';
import { ProductService } from './product.service';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { OrderService } from './order.service';
import { PaymentService } from './payment.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  //Data variables to store client information on the client's localStorage
  private cartDataClient: CartModelClient = {
    prodData: [
      {incart: 0, product_id: 0, variation_id: 0, color_id: 0}
    ],
    total: 0,
    // couponData: { total_price: 0, amount_saved: 0, coupon_value: 0, coupon_type: ''}
  }; // This will be sent to the backend Server as post data

  // Cart Data variable to store the cart information on the server (Angular not Backend)
  private cartDataServer: CartModelServer = {
    data: [
      {
        product: undefined,
        numInCart: 0,
        variation: undefined,
        color: undefined,
      },
    ],
    total: 0,
    // couponData: undefined
  };

  cartTotal$ = new BehaviorSubject<Number>(0);
  couponData$ = new BehaviorSubject<any>(null);

  // Data variable to store the cart information on the client's local storage
  cartDataObs$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);
  cartTotal: number;
  actualProdInfo: ProductModelServer;
  actualVariation: VariationModel;
  actualColor: ColorModel;
  orderId;
  // couponDataSaved: CouponModelServer;
  amountPaid = 0
  amountSaved = 0
  constructor(
    private productService: ProductService,
    private paymentService: PaymentService,
    private orderService: OrderService,
    private toast: ToastrService,
    private router: Router,
  ) {
    this.cartTotal$.next(this.cartDataServer.total);
    this.cartDataObs$.next(this.cartDataServer);
    
    let info: CartModelClient = JSON.parse(localStorage.getItem('cart'));

    if (info !== null && info !== undefined && info.prodData[0].incart !== 0) {
      // assign the value to our data variable which corresponds to the LocalStorage data format
      this.cartDataClient = info;
      // Loop through each entry and put it in the cartDataServer object
      this.cartDataClient.prodData.forEach((dataCart) => {
        const id: any = dataCart.product_id;
        this.productService.fetchProductDetails(id, (error, result) => {
          this.actualProdInfo = result;
          
          this.actualVariation = result.variations.find((data) => {
            return data.id === dataCart.variation_id;
          });
          this.actualColor = this.actualVariation.colors.find((data) => {
            return data.id === dataCart.color_id;
          });

          if (this.cartDataServer.data[0].numInCart === 0) {
            this.cartDataServer.data[0].numInCart = dataCart.incart;
            this.cartDataServer.data[0].variation = this.actualVariation;
            this.cartDataServer.data[0].color = this.actualColor;
            this.cartDataServer.data[0].product = this.actualProdInfo;
            this.CalculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          } else {
            this.cartDataServer.data.push({
              numInCart: dataCart.incart,
              product: this.actualProdInfo,
              variation: this.actualVariation,
              color: this.actualColor,
            });
            this.CalculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          }
          this.cartDataObs$.next({ ...this.cartDataServer });
        });
      });
    }
  }

  public get couponValue(): CouponModelServer {
    return this.couponData$.value;
  }

  CalculateSubTotal(index: any): Number {
    let subTotal = 0;
    let product = this.cartDataServer.data[index];
    // @ts-ignore
    subTotal = product.variation.sell_price * product.numInCart;
    return subTotal;
  }

  AddProductToCart(id, variation, color, quantity?: number) {
    console.log(variation, 'variation')
    
    this.productService.fetchProductDetails(id, (error, result) => {
      const product = result;
      // If the cart is empty
      if (this.cartDataServer.data[0].product === undefined) {
        this.cartDataServer.data[0].product = product;
        this.cartDataServer.data[0].variation = variation;
        this.cartDataServer.data[0].color = color;
        console.log(quantity, 'quantity')
        this.cartDataServer.data[0].numInCart = quantity !== undefined ? quantity : 1;
        console.log(this.cartDataServer.data[0].numInCart, 'this.cartDataServer.data[0].numInCart')
        this.CalculateTotal();
        this.cartDataClient.prodData[0].incart = this.cartDataServer.data[0].numInCart;
        console.log(this.cartDataClient.prodData[0].incart, 'this.cartDataClient.prodData[0].incart')
        this.cartDataClient.prodData[0].product_id = product.id;
        this.cartDataClient.prodData[0].variation_id = variation.id;
        this.cartDataClient.prodData[0].color_id = color.id;
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartDataObs$.next({ ...this.cartDataServer });
        //Toast notification
        this.toast.success(`${product.title} added to the cart.`, 'Product Added');
      } // END of IF
      // Cart is not empty
      else {
        let index = this.cartDataServer.data.findIndex(
          (p) => p.product.id === product.id
        );
        // 1. If chosen product is already in cart array
        if (index !== -1) {
          if (quantity !== undefined && quantity <= variation.quantity) {
            // @ts-ignore
            this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart < variation.quantity ? quantity : variation.quantity;
            this.cartDataServer.data[index].variation = variation;
            this.cartDataServer.data[index].color = color;
          } else {
            // @ts-ignore
            this.cartDataServer.data[index].numInCart < variation.quantity ? this.cartDataServer.data[index].numInCart++ : variation.quantity;
            this.cartDataServer.data[index].variation = variation;
            this.cartDataServer.data[index].color = color;
          }
          //Toast notification
          this.cartDataClient.prodData[index].incart = this.cartDataServer.data[index].numInCart;
          this.cartDataClient.prodData[index].variation_id = this.cartDataServer.data[index].variation.id;
          this.cartDataClient.prodData[index].color_id = this.cartDataServer.data[index].color.id;  
          this.toast.info( `${product.title} quantity updated in the cart.`,  'Product Updated' );
        }
        // 2. If chosen product is not in cart array
        else {
          this.cartDataServer.data.push({
            product: product,
            numInCart: 1,
            variation: variation,
            color: color,
          });
          this.cartDataClient.prodData.push({
            incart: 1,
            product_id: product.id,
            variation_id: variation.id,
            color_id: color.id,
          });
          //Toast notification
          this.toast.success( `${product.title} added to the cart.`,  'Product Added' );
        }
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartDataObs$.next({ ...this.cartDataServer });
      } // END of ELSE
    });
  }

  UpdateCartData(index: any, increase: Boolean) {
    let data = this.cartDataServer.data[index];
    if (increase) {
      // @ts-ignore
      data.numInCart < data.variation.quantity ? data.numInCart++ : data.variation.quantity;
      this.cartDataClient.prodData[index].incart = data.numInCart;
      this.cartDataServer.data[index].variation = data.variation;
      this.cartDataServer.data[index].color = data.color;
      this.CalculateTotal();
      this.cartDataObs$.next({ ...this.cartDataServer });
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    } else {
      // @ts-ignore
      data.numInCart--;

      // @ts-ignore
      if (data.numInCart < 1) {
        this.DeleteProductFromCart(index);
        this.cartDataObs$.next({ ...this.cartDataServer });
      } else {
        // @ts-ignore
        this.cartDataObs$.next({ ...this.cartDataServer });
        this.cartDataClient.prodData[index].incart = data.numInCart;
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }
    }
  }

  DeleteProductFromCart(index) {
    if (window.confirm('Are you sure you want to delete the item?')) {
      /**Recalculate total amount if an item is added or removed */
      this.cartDataServer.data.splice(index, 1);
      this.cartDataClient.prodData.splice(index, 1);
      this.CalculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;
      /**Clear cart if total amount in cart client data is 0 */
      if (this.cartDataClient.total === 0) {
        this.emptyCartClient()
      }else {
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }
      /**Clear cart if total amount in cart server data is 0 */
      if (this.cartDataServer.total === 0) {
        this.emptyCartServer()
      } else {
        this.cartDataObs$.next({ ...this.cartDataServer });
      }
  
    }
    // If the user doesn't want to delete the product, hits the CANCEL button
    else {
      return;
    }
  }
  /**
   * 
   * @param data Claim available customer coupon 
   */
  claimCoupon(data){
    const cData = {initial_amount: this.cartDataClient.total, code: data.code, is_code: data.is_code, coupon_id: data.coupon_id}
    this.orderService.claimCoupon(cData, (error, result)=> {
      if(result !== null && result.status_code === '100'){
        const coupon = result.data
        this.couponData$.next(coupon);
        this.amountPaid = this.couponData$.value.amount_paid;
        this.amountSaved = this.couponData$.value.amount_saved
      } 
    })
  }
  /**
   * 
   * @param paymentData Checkout customer orders
   * Here Customer payment info is sent together with order
   */
  checkoutCart(paymentData) {
    this.paymentService.makePayment(paymentData, (error, result) => {
      if(result !== null && result.status === "SUCCESS"){        
        const orderData = {'total_price': this.cartDataClient.total, 'amount_saved': this.amountSaved, 'amount_paid': (this.cartDataClient.total - this.amountSaved), 'order_items': this.cartDataClient.prodData};
        // console.log(orderData, 'orderData')
        
        this.orderService.createOrder(orderData, (error, result)=>{
          this.emptyCartServer();
          // console.log(result, 'result')
          if(result !== null && result.status_code === "100"){
            this.orderId = result.data.id
            this.orderService.getOrderDetail(this.orderId, (error, result) => {
              // console.log(result, 'getOrderDetail')
              if (result !== null && result.status_code === "100") {
                const navigationExtras: NavigationExtras = {
                  state: {
                    order: result
                  }
                };
                // this.spinner.hide().then();
                this.router.navigate(['/order-confirmation'], navigationExtras).then(p => {
                  this.emptyCartClient();
                });
              }
            });
          }
        })
      } else {
        // this.spinner.hide().then();
        this.router.navigateByUrl('/checkout').then();
        this.toast.error(`Sorry, failed to place the order`, "Order Status")
      }
    
    })
  }
     /**
   * 
   * @param index of cart item to delete (items are removed locally)
   * @returns 
  */
  clearCart() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will clear all items in cart!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      console.log(result, 'RESUL')
      if (result.value) {
        this.emptyCartClient()
        this.emptyCartServer()
        Swal.fire('Cleared!', 'Cart items has been cleared.', 'success');
      }else{
        return
      }
    });
  }

  /**
   * Helper functions
   */
  private CalculateTotal() {
    let Total = 0;
    this.cartDataServer.data.forEach((p) => {
      const { numInCart } = p;
      const { sell_price } = p.variation;
      // @ts-ignore
      Total += numInCart * sell_price;
    });
    this.cartDataServer.total = Total;
    this.cartTotal$.next(this.cartDataServer.total);
  }

  emptyCartClient() {
    this.cartDataClient = {
      prodData: [{ incart: 0, product_id: 0, variation_id: 0, color_id: 0 }],
      total: 0,
      // couponData: { total_price: 0, amount_saved: 0, coupon_value: 0, coupon_type: ''}
    };
    localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
  } 

  emptyCartServer() {
    this.cartDataServer = {
    data: [
      { product: undefined, numInCart: 0, variation: undefined, color: undefined}],
        total: 0,
        // couponData: undefined
      };
    this.cartDataObs$.next({ ...this.cartDataServer });
  }

}
