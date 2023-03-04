import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { sample_foods, sample_tags } from 'src/data';
import { Tag } from '../shared/models/Tag';
@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll():Food[]{

    return sample_foods;
  }

  getFoodsBySearchTerm(searchTerm:string){

    return this.getAll().filter((food)=>food.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  getFoodById(id:string):Food{
    return this.getAll().find((food)=>food.id ===id)?? new Food()
  }

  getAllTags():Tag[]{

    return sample_tags;
  }
  getFoodsByTag(tag:string):Food[]{

  return tag==='All'? this.getAll() : this.getAll().filter((food)=>food.tags?.includes(tag) )
  }
}
