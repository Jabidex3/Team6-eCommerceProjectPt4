import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { Cart } from 'src/app/models/Cart';
import { CartCrudService } from 'src/app/services/cart-crud.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  userForm: FormGroup;
  profilePicture: string;
  loggedInUser$: User;
  cartItems$: Observable<Cart[]>;
  total$: number;

  constructor(private cartCrudService: CartCrudService, private router: Router) {
    this.loggedInUser$ = JSON.parse(sessionStorage.getItem('currentUser'));
    this.profilePicture = this.loggedInUser$.picture;
    this.total$ = JSON.parse(sessionStorage.getItem('price'));
  }

  ngOnInit(): void {
    this.userForm = this.createUserForm();
    this.cartItems$ = this.cartCrudService.fetchAll(this.loggedInUser$.id);

  }

  createUserForm(): FormGroup {
    return new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
      baddress: new FormControl("", [Validators.required]),
      bapt: new FormControl(""),
      bcity: new FormControl("", [Validators.required]),
      bstate: new FormControl("", [Validators.required]),
      bcountry: new FormControl("", [Validators.required]),
      bzip: new FormControl("", [Validators.required]),
      saddress: new FormControl("", [Validators.required]),
      sapt: new FormControl(""),
      scity: new FormControl("", [Validators.required]),
      sstate: new FormControl("", [Validators.required]),
      scountry: new FormControl("", [Validators.required]),
      szip: new FormControl("", [Validators.required])
    });
  }



  deleteSessionUserInfo(): void {
    sessionStorage.removeItem('currentUser');
  }

  continueCheck: boolean = true;
  initialCheck: boolean = false;
  continueToSubmitOrder(): void {
    console.log(this.userForm.value);
    if (this.userForm.valid) {
      this.continueCheck = false;
      this.initialCheck = true;
    }

  }

  editInfo(): void {
    this.continueCheck = true;
    this.initialCheck = false;
  }

  cancel(): void {
    //console.log("hello");
    this.router.navigate(["cart"]);
  }

  submit(): void {
    //console.log("hello");
    this.cartCrudService.deleteAll(this.loggedInUser$.id).subscribe();
    this.router.navigate(["thanks"]);
  }
}
