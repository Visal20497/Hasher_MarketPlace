import { Component } from '@angular/core';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-confirmation-payment',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-payment.component.html',
  styleUrl: './confirmation-payment.component.css'
})
export class ConfirmationPaymentComponent {
transactionId=''
constructor(public payment:PaymentService){}
ngOnInit():void{
this.transactionId=this.payment.getTransactionID()
}
}
