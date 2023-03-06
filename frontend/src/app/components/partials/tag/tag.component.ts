import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food-service.service';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
 tags:Tag[]=[];
  constructor(private foodService:FoodService) {
    let tagObservable:Observable<Tag[]>
    tagObservable = this.foodService.getAllTags()
    tagObservable.subscribe((tags)=>{
      this.tags = tags
    })
}


  ngOnInit(): void {
console.log(this.tags)

  }

}
