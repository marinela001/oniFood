import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router,} from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUserRegister } from 'src/app/shared/interfaces/IUserRegister';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!:FormGroup;
  isSubmited=false;
  returnUrl = '';
    constructor(private formBuilder:FormBuilder,private userService:UserService,private activatedRoute:ActivatedRoute,private router:Router) { }

    ngOnInit(): void {
      this.registerForm= this.formBuilder.group({
      username:['',[Validators.required,Validators.minLength(5)]],
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required]],
        confirm_password:['',[Validators.required]],
        address:['',[Validators.required]]
      },

    {
      validator: this.ConfirmedValidator('password', 'confirm_password'),
    })

     this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
    }

    get fc(){
  return this.registerForm.controls
    }

    onSubmit(){

      this.isSubmited =true;

  if(this.registerForm.invalid) return;
  const User:IUserRegister = {email:this.fc.email.value,
               password:this.fc.password.value,
               username:this.fc.username.value,
               address:this.fc.address.value,
               isAdmin:false              }
 this.userService.register(User).subscribe(()=>{
  this.router.navigateByUrl(this.returnUrl)

  }
  )

  alert(`email: ${this.fc.email.value} and pass:${this.fc.password.value}`)
    }

    ConfirmedValidator(controlName: string, matchingControlName: string) {
      return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (
          matchingControl.errors &&
          !matchingControl.errors.confirmedValidator
        ) {
          return;
        }
        if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmedValidator: true });
        } else {
          matchingControl.setErrors(null);
        }
      };
    }
  }

