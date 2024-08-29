import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';
import { Subject } from 'rxjs';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  originalAllProducts: any[] = [];
  allProduct: any[] = [];
  filer: FormGroup;
  searchFilter = new Subject<string>();
  cartItem: any[] = []

  constructor(private toastr: ToastrService,
    public authService: AuthService,
    private productService: ProductService,
    private cart: CartService) {
    this.filer = new FormGroup({
      shortBySelectedValue: new FormControl('', []),
      searchByName: new FormControl('', [])
    })
  }
  ngOnInit(): void {
    this.getData();
    this.GetAllCartItem();
  }

  getData(): void {
    this.productService.getAllProduct().subscribe((products: any) => {
      this.allProduct = products;
      this.originalAllProducts = products;
    }, (error: any) => {
      console.error('Error:', error);
    });
  }

  GetAllCartItem() {
    this.cartItem = this.cart.GetAllCartItem()
    // console.log(this.cartItem)
  }

  sortByPrice() {
    const value = this.filer.controls["shortBySelectedValue"].value;
    const property = value.split("_")[0];
    const order = value.split("_")[1];
    if (property == "name") {
      if (order == "asc") {
        this.allProduct = this.allProduct.sort((a, b) => (a.name > b.name) ? 0 : -1);
      } else {
        this.allProduct = this.allProduct.sort((a, b) => (b.name > a.name) ? 0 : -1);
      }
    }
    if (property == "price") {
      if (order == "asc") {
        this.allProduct = this.allProduct.sort((a, b) => a.price - b.price);
      } else {
        this.allProduct = this.allProduct.sort((a, b) => b.price - a.price);
      }
    }
  }
  

  search(query: KeyboardEvent) {
    const value = (query.target as HTMLInputElement).value
    if (!value) {
      this.allProduct = this.originalAllProducts;
    } else {
      this.allProduct = this.allProduct.filter((x) => x.name.toLowerCase().includes(value.toLowerCase()));
    }
  }
  hideSearch() {
    this.allProduct = this.originalAllProducts
  }
  Reset() {
    window.location.href = '/'
  }

  AddtoCart(product: { id: string, name: string, url: string, description: string, price: number, seller: string }) {
    let cartData = localStorage.getItem('cart');
    let currentCart = [];
    if (cartData) {
      try {
        let parsedData = JSON.parse(cartData);
        if (Array.isArray(parsedData)) {
          currentCart = parsedData;
          console.log(currentCart)
        } else {
          console.error('Cart data is not an array');
        }
      } catch (e) {
        console.error('Error parsing cart data:', e);
      }
    }
    let productExists = currentCart.find((item: { id: string, name: string, url: string, description: string, price: number, seller: string, qty?: number }) => item.id === product.id);
    if (productExists) {
      productExists.qty += 1;
    } else {
      currentCart.push({ ...product, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(currentCart));
    this.toastr.success("Item added to the cart");
    this.GetAllCartItem();
  }






}
