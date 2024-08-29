import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginFrom:FormGroup;
  constructor(private toastr: ToastrService,
    private authService:AuthService,private router:Router){
    this.loginFrom=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.minLength(8)])
    })
  }
   login(){
    console.log(this.loginFrom)
    this.authService.loginUser(this.loginFrom.value.email,this.loginFrom.value.password)
    this.toastr.success('User login successfully');
    
   }
   reset(){
    this.loginFrom.reset()
   }
}
