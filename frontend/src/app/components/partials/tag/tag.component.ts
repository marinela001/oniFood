import { Component, OnInit } from '@angular/core';
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
}

  ngOnInit(): void {

    this.tags = this.foodService.getAllTags();console.log(this.tags)
  }

}
