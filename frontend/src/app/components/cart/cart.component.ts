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
  itemCount$: Observable<any>;
  price$: Observable<any>;
  currUser$: User;
  profilePicture: string;
  constructor(private cartCrudService: CartCrudService, private router: Router) {
    this.currUser$ = JSON.parse(sessionStorage.getItem('currentUser'));
    this.profilePicture = this.currUser$.picture;

  }

  ngOnInit(): void {
    this.cartItems$ = this.cartCrudService.fetchAll(this.currUser$.id)
    this.itemCount$ = this.cartCrudService.getCount(this.currUser$.id)
    this.price$ = this.cartCrudService.getPrice(this.currUser$.id)
    this.showCart();
  }

  deleteSessionUserInfo(): void {
    sessionStorage.removeItem('currentUser');
  }

  delete(cid: number): void {
    this.cartCrudService.delete(cid).subscribe();
    window.location.reload();

  }

  checkout(): void {
    //console.log("hello");
    this.router.navigate(["checkout"]);
  }

  emptyCart(): void {

    this.cartCrudService.deleteAll(this.currUser$.id).subscribe();
    window.location.reload();
    //console.log("clear");
  }


  emptyCartCheck: boolean = false;
  defEmptyCart: boolean = false;
  async showCart() {
    try {
      await this.itemCount$.forEach(value => sessionStorage.setItem('records', JSON.stringify([value][0])));
    }
    catch {
      console.log('error retrieving from db');
    }

    var records = JSON.parse(sessionStorage.getItem('records'));
    if (records == 0) {
      this.emptyCartCheck = false;
      this.defEmptyCart = true;
    }
    else {
      this.emptyCartCheck = true;
      this.defEmptyCart = false;
      this.total();
    }
  }
  async total(): Promise<void> {
    try {
      await this.price$.forEach(value => sessionStorage.setItem('price', JSON.stringify([value][0])));
    }
    catch {
      console.log('error retrieving from db');
    }

    var total = JSON.parse(sessionStorage.getItem('price'));
    let myContainer = document.getElementById('price') as HTMLElement;
    myContainer.innerHTML = "Grand Total: <b>$" + total + "</b>";
  }
}
