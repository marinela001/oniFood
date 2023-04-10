import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food-service.service';
import { Food } from 'src/app/shared/models/Food';
import { AppState } from 'src/app/store/app.state';
import { getUser, isAuthenticated } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foods:Food[]=[];
  public user$ = this.store.select(getUser);
  constructor(private foodService: FoodService,private activatedRoute:ActivatedRoute,private router:Router,private store: Store<AppState>) {
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

      foodObservable.subscribe((foods) => {
        this.foods=foods;


      })
    })
  }

  ngOnInit(): void {
this.store.select(isAuthenticated).subscribe((data)=>{

  console.log('isAuthenticated: '+data)
})


this.store.select(getUser).subscribe((data)=>{
  console.log(data)
})


  }
 goToDetail(id:string){
this.router.navigateByUrl(`/food/${id}`)
 }




}
