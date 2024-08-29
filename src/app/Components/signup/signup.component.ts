import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user:FormGroup;
  constructor(private toastr: ToastrService,
    private authService:AuthService){
  this.user=new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(6)]),
    email:new FormControl('',[Validators.required,Validators.email,
      Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    ]),
    password:new FormControl('',[Validators.required,Validators.minLength(8),
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
      Validators.maxLength(20)
    ]),
    cpassword:new FormControl('',[Validators.required,Validators.minLength(8),
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
      Validators.maxLength(20)
    ]),
    address:new FormControl('',[Validators.required]),
    gender:new FormControl('',[Validators.required]),
    answer:new FormControl('',[Validators.required])
  },{validators:Validators.required})
}
  Submit(){
  // console.log(this.user)
  this.authService.registerUser(this.user.value.email,this.user.value.password,this.user.value.name)
  this.toastr.success('User register successfully');
  
  }
  Reset(){
    this.user.reset()
  }
}
