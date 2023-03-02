import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { FoodService } from 'src/app/services/food-service.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foods:Food[]=[];
  constructor(private foodService: FoodService,private activatedRoute:ActivatedRoute) {

    activatedRoute.params.subscribe((params)=>{
      if(params.searchTerm){
        this.foods= foodService.getFoodsBySearchTerm(params.searchTerm)
        console.log(this.foods)
      }
      else if (params.tags){
        this.foods=this.foodService.getFoodsByTag(params.tags)
      }
      else  this.foods = this.foodService.getAll();
    })
  }

  ngOnInit(): void {

    // this.foods = this.foodService.getAll();
  }





}
