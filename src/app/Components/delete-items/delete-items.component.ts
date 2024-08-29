import { Component, OnInit } from '@angular/core';
import { MyItemsDashboardComponent } from '../my-items-dashboard/my-items-dashboard.component';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-items',
  standalone: true,
  imports: [MyItemsDashboardComponent],
  templateUrl: './delete-items.component.html',
  styleUrl: './delete-items.component.css'
})
export class DeleteItemsComponent  implements OnInit{
  allProduct: any[] = [];
  constructor(private toastr: ToastrService,
    private productService: ProductService,public authService:AuthService) {}
  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.productService.getAllProduct().subscribe((products:any) => {
      this.allProduct = products;
    }, (error: any) => {
      console.error('Error:', error);
    });
  }
  delProduct(id: string) {
    this.productService.deleteProduct(id).subscribe()
      this.allProduct = this.allProduct.filter(product => product.id !== id);
      this.toastr.success('Item delete Successfully');
  
  }
}