import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient) { }

 
  getAllProduct() {
    return this.http.get('http://localhost:3000/product')
  }

  getProductById(id: string) {
    return this.http.get(`http://localhost:3000/product/${id}`);
  }

  addProduct(product: { name: string, url: string, description: string, price: number }, seller: string) {
    return this.http.post('http://localhost:3000/product', { ...product, seller });
  }

  updateProduct(product: { id: string, name: string, url: string, description: string, price: number }) {
    return this.http.put(`http://localhost:3000/product/${product.id}`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete(`http://localhost:3000/product/${id}`);
  }
}
