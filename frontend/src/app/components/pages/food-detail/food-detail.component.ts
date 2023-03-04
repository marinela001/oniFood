import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food-service.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit {
 food!:Food
  constructor(activatedRoute:ActivatedRoute, private foodService:FoodService,private cartService:CartService,private router:Router) {

    activatedRoute.params.subscribe((params)=>{
if(params.id){
  this.food = this.foodService.getFoodById(params.id);
}

    })
   }

  ngOnInit(): void {
  }

  addToCart(){
    console.log('object')
    console.log(this.food)
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart')
  }

}
