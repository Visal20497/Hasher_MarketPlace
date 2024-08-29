import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  cartLength:number=0;
  cartArray:any[]=[]
  constructor(private toastr: ToastrService,public authServices:AuthService ,private cart:CartService){
    this.cartLength=0;
    this.cartArray=[]
  }
  ngOnInit(): void {
  this.CartLength()
  this.CartLength
  }
  CartLength(){
      this.cartArray=this.cart.GetAllCartItem()
      this.cartLength = this.cartArray.length;
  }
  Logout(){
    this.toastr.success('user logout ');
  }
}
