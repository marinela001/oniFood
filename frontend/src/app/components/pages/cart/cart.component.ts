import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
cart!:Cart
  constructor(private cartService:CartService) { this.cartService.getCartObservable().subscribe((cart) => {
    this.cart = cart;
  })}

  ngOnInit(): void {
    console.log(this.cart)
  }

removeFromCart(cartItem:CartItem){
  this.cartService.removeFromCart(cartItem.food.id)
}
changeQuantity(cartItem:CartItem,quantity: string){
  this.cartService.changeQuantity(cartItem.food.id,parseInt(quantity))
}
}
