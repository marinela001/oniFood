import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUserLogin } from 'src/app/shared/interfaces/IUserLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm!:FormGroup;
isSubmited=false;
returnUrl = '';
  constructor(private formBuilder:FormBuilder,private userService:UserService,private activatedRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
   this.loginForm= this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })

   this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc(){
return this.loginForm.controls
  }

  onSubmit(){

    this.isSubmited =true;

if(this.loginForm.invalid) return;

const User:IUserLogin = {email:this.fc.email.value,password:this.fc.password.value}
this.userService.login(User).subscribe(()=>{
this.router.navigateByUrl(this.returnUrl)

}
)

// alert(`email: ${this.fc.email.value} and pass:${this.fc.password.value}`)
  }

}
