import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { AddItemsComponent } from './Components/add-items/add-items.component';
import { CartComponent } from './Components/cart/cart.component';
import { DeleteItemsComponent } from './Components/delete-items/delete-items.component';
import { UpdateItemsComponent } from './Components/update-items/update-items.component';
import { MyItemsComponent } from './Components/my-items/my-items.component';
import { UpdateProductComponent } from './Components/update-product/update-product.component';
import { TransactionComponent } from './Components/transaction/transaction.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { ConfirmationPaymentComponent } from './Components/confirmation-payment/confirmation-payment.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: DashboardComponent ,canActivate:[authGuard]},
    { path: 'signup', component: SignupComponent },
    { path: 'add-item', component: AddItemsComponent,canActivate:[authGuard] },
    { path: 'delete-item', component: DeleteItemsComponent,canActivate:[authGuard] },
    { path: 'update-item', component: UpdateItemsComponent,canActivate:[authGuard] },
    { path: 'transaction', component: TransactionComponent,canActivate:[authGuard] },
    { path: 'payment', component:PaymentComponent,canActivate:[authGuard] },
    { path: 'confirmtranaction', component:ConfirmationPaymentComponent,canActivate:[authGuard] },
    { path: 'updateProduct/:id', component: UpdateProductComponent,canActivate:[authGuard]},
    { path: 'myitem', component: MyItemsComponent,canActivate:[authGuard] },
    { path: 'cart', component: CartComponent,canActivate:[authGuard] },
    { path: 'dashboard', component:DashboardComponent,canActivate:[authGuard]},
    { path: '**', component: NotFoundComponent},
];
