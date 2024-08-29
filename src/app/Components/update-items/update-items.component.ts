import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MyItemsDashboardComponent } from '../my-items-dashboard/my-items-dashboard.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-update-items',
  templateUrl: './update-items.component.html',
  imports: [MyItemsDashboardComponent],
  standalone:true,
  styleUrls: ['./update-items.component.css']
})
export class UpdateItemsComponent implements OnInit {
  allProduct: any[] = [];

  constructor(public authService:AuthService,private productService: ProductService, private router:Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.productService.getAllProduct().subscribe((products: any) => {
      this.allProduct = products;
    }, (error: any) => {
      console.error('Error:', error);
    });
  }

  updateProduct(product: { id: string, name: string, url: string, description: string, price: number }) {
    this.router.navigate([`/updateProduct/${product.id}`]);
  }
}
