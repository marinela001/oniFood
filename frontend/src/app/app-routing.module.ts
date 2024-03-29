import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { FoodDetailComponent } from './components/pages/food-detail/food-detail.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'search/:searchTerm',component:HomeComponent},
  {path:'tag/:tags',component:HomeComponent},
  {path:'food/:id',component:FoodDetailComponent},
  {path:'cart',component:CartComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'checkout',component:CheckoutPageComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
