import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/Cart';
import { CartCrudService } from 'src/app/services/cart-crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { stringify } from 'querystring';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems$: Observable<Cart[]>;
  currUser$: User;
  profilePicture: string;
  constructor(private cartCrudService: CartCrudService, private router: Router) {
    this.currUser$ = JSON.parse(sessionStorage.getItem('currentUser'));
    this.profilePicture = this.currUser$.picture;
  }

  ngOnInit(): void {
    this.cartItems$ = this.cartCrudService.fetchAll(this.currUser$.id)
  }
  deleteSessionUserInfo(): void {
    sessionStorage.removeItem('currentUser');
  }
}
