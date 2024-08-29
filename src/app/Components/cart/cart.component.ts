import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItem: any[] = []
  Total: number = 0;
  constructor(private cart: CartService,public paymentService:PaymentService) {
  }
  ngOnInit(): void {
    this.GetAllCartItem();
    this.totalCost()
  }

  GetAllCartItem() {
    this.cartItem = this.cart.GetAllCartItem()
    this.totalCost()
     
  }

  deleteCartItem(cart: { id: string, name: string, url: string, description: string, price: number, qty: number, seller: string }) {
    let cartData = localStorage.getItem('cart');
    let currentCart = cartData ? JSON.parse(cartData) : [];

    const productExists = currentCart.find((item: { id: string, name: string, url: string, description: string, price: number, qty: number, seller: string }) => item.id === cart.id);

    if (productExists && productExists.qty > 1) {
      productExists.qty -= 1;
      localStorage.setItem('cart', JSON.stringify(currentCart));
      this.GetAllCartItem();
      this.totalCost()
    } else if (productExists && productExists.qty === 1) {
      const index = currentCart.indexOf(productExists);
      if (index !== -1) {
        currentCart.splice(index, 1);
      }
      localStorage.setItem('cart', JSON.stringify(currentCart));
      this.GetAllCartItem();
      this.totalCost()
    }
}

  totalCost() {
    let totalamount = 0;
    if (this.cartItem && this.cartItem.length > 0) {
      totalamount = this.cartItem.reduce((acc, element) => {
        if (element.price && element.qty && !isNaN(element.price) && !isNaN(element.qty)) {
          return Math.trunc(acc + (element.price * element.qty));
        } else {
          return Math.trunc(acc);
        }
      }, 0);
      this.Total=totalamount
    }
  }
  payment(){
   this.paymentService.setTotalAmount(this.Total+25)
  }
}
