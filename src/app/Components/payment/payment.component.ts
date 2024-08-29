import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  CartItem: any;
  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;
  constructor(private router: Router, public payment: PaymentService, private cart: CartService,
    private authService: AuthService
  ) { }
  ngOnInit(): void {
    this.getAllCartItem()
    window.paypal.Buttons(
      {
        style: {
          layout: 'horizontal',
          color: 'gold',
          shape: 'rect',
          label: "paypal",
          height: 55
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.payment.getTotalAmount().toString(),
                  currency_code: 'USD'
                }
              }
            ]
          })
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            if (details.status === "COMPLETED") {
              this.payment.AddTransction({ details: details, cartItem: this.CartItem, buyUser: this.authService.getUserName() }).subscribe()
              this.payment.setTransactionID(details.id)
              this.cart.CartEmpty()
              this.router.navigate(['/confirmtranaction'])
            }
          })
        },
        onError: (error: any) => {
          console.log(error)
        }
      }
    ).render(this.paymentRef.nativeElement);
  }
  getAllCartItem() {
    let cart = localStorage.getItem('cart');
    if (cart) {
        this.CartItem = JSON.parse(cart);
    } else {
        this.CartItem = [];
    }
    return this.CartItem;
}



}
