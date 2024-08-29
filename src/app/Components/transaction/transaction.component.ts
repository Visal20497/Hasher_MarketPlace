import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent implements OnInit {
  AllTransction: any;
  AllProduct: any;
  constructor(public transction: PaymentService,
    public productService: ProductService,
    public AuthService: AuthService) { }
  ngOnInit(): void {
    this.getAllTransctionData()
    this.getAllProdcut()
  }
  getAllTransctionData() {
    this.transction.GetAllTransction().subscribe((result) => {
      this.AllTransction = result
      console.log(this.AllTransction,'alltranction')
    })
  }
  getAllProdcut() {
    this.productService.getAllProduct().subscribe((result) => {
      this.AllProduct = result
      // console.log(this.AllProduct)
    })
  }

}
