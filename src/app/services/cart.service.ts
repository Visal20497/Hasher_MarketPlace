import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  GetAllCartItem() {
    const cart = localStorage.getItem('cart')
    if (typeof cart === 'string') {
        return JSON.parse(cart);
    } else {
        return [];
    }
  }
  addToCart(Cart: { id: string, name: string, url: string, description: string, price: number, qty: number, seller: string }) {
    let currentCart = localStorage.getItem('cart');
    let cart;
    if (currentCart) {
        cart = JSON.parse(currentCart)
    } else {
        cart = [];
    }
    cart.push(Cart);  
    localStorage.setItem('cart', JSON.stringify(cart)); 
}

updateCart(Cart: { id: string, name: string, url: string, description: string, price: number, qty: number, seller: string }) {
  let currentCart = localStorage.getItem('cart');
  let cart;
  if (currentCart) {
      cart = JSON.parse(currentCart);
  } else {
      cart = [];
  }
  let itemIndex = cart.findIndex((item: { id: string, name: string, url: string, description: string, price: number, qty: number, seller: string }) => item.id === Cart.id); 
  if (itemIndex > -1) {
      cart[itemIndex] = Cart;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
}

 
  CartEmpty(){
   return localStorage.setItem('cart',JSON.stringify([]))
  }
}
