import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food-service.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foods:Food[]=[];
  constructor(private foodService: FoodService,private activatedRoute:ActivatedRoute,private router:Router) {
    let foodObservable:Observable<Food[]>
    activatedRoute.params.subscribe((params)=>{
      if(params.searchTerm){
        foodObservable= foodService.getFoodsBySearchTerm(params.searchTerm);
      }
      else if (params.tags){

        foodObservable=this.foodService.getFoodsByTag(params.tags);

      }
      else  {

        foodObservable= this.foodService.getAll();}

      foodObservable.subscribe((foods)=>{
        this.foods=foods;


      })
    })
  }

  ngOnInit(): void {

    // this.foods = this.foodService.getAll();
  }
 goToDetail(id:string){
this.router.navigateByUrl(`/food/${id}`)
 }




}
