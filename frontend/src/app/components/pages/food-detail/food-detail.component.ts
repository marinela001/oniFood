import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    let foodObservable:Observable<Food>

    activatedRoute.params.subscribe((params)=>{
if(params.id){
  foodObservable = this.foodService.getFoodById(params.id);
}
  foodObservable.subscribe((food)=>{
      this.food=food;
    })
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
