import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  transactionID:any;
  TotalAmount:any;
  constructor(private http:HttpClient) { }
  getTransactionID(){
    return this.transactionID
  }
  setTransactionID(transactionID:any){
    this.transactionID=transactionID
  }
  getTotalAmount(){
    return this.TotalAmount
  }
  setTotalAmount(TotalAmount:any){
   this.TotalAmount=TotalAmount
   console.log(TotalAmount)
  }

  AddTransction(product:any){
  return this.http.post('http://localhost:3000/transaction',product)
  }
  GetAllTransction(){
    return this.http.get('http://localhost:3000/transaction')
  }
  
}
