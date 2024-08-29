import { Component, OnInit, inject} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { MyItemsDashboardComponent } from '../my-items-dashboard/my-items-dashboard.component';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-items',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,MyItemsDashboardComponent],
  templateUrl: './add-items.component.html',
  styleUrl: './add-items.component.css'
})
export class AddItemsComponent implements OnInit{
  items: FormGroup;
  UserName:any;
  constructor(private toastr: ToastrService,
    private product:ProductService, private authService:AuthService) {
    this.UserName=this.authService.getUserName()
    this.items = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      images: new FormControl('', [Validators.required])
    })
   
  }

  ngOnInit(): void {
   this.authService.getUserName()
  }
 

  async createProduct() {
     this.UserName=this.authService.getUserName()
     console.log(this.UserName)
   await this.product.addProduct(this.items.value,this.UserName).subscribe((result:any) => {
       console.log(result)
       this.toastr.success('New Item created');
        window.location.reload()
     })
     this.items.value!=null

  }
}
