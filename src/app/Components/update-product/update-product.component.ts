import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { MyItemsDashboardComponent } from '../my-items-dashboard/my-items-dashboard.component';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [MyItemsDashboardComponent,ReactiveFormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {
  items: FormGroup;
  productId: string = "";
  productData: any;

  constructor(private product:ProductService, private route: ActivatedRoute,
    private router:Router
  ) {
    this.items = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      images: new FormControl('', [Validators.required])
    });
    this.getProductId();
  }

  getProductId() {
    this.route.paramMap.subscribe((data:any) => {
      this.productId = data.get("id");
      this.getProductById(this.productId);
    });
  }

  getProductById(productId: string) {
    this.product.getProductById(this.productId)
    .subscribe((product: any) => {
      this.productData = product;
      this.setDefaultValuesInUpdateForm();
    });
  }

  setDefaultValuesInUpdateForm() {
    this.items.controls["name"].setValue(this.productData.name);
    this.items.controls["description"].setValue(this.productData.description);
    this.items.controls["price"].setValue(this.productData.price);
    this.items.controls["images"].setValue(this.productData.images);
  }
  getUpdateData(){
    this.product. updateProduct({...this.items.value,id:this.productId}).subscribe((result)=>{
        console.log(result)
        this.router.navigate(['/update-item'])
    })
  }

  

  

  
}
