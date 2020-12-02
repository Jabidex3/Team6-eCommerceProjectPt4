import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductCrudService } from 'src/app/services/product-crud.service';
import { CartCrudService } from 'src/app/services/cart-crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss']
})
export class ViewItemComponent implements OnInit {
  currItem$: Product;
  loggedInUser$: User;
  facilitatorForm: FormGroup;
  constructor(private productCrudService: ProductCrudService, private cartCrudService: CartCrudService, private router: Router) { }

  ngOnInit(): void {
    this.currItem$ = JSON.parse(sessionStorage.getItem('currentItem'));
    this.loggedInUser$ = JSON.parse(sessionStorage.getItem('currentUser'));
    this.productStuff();
    this.facilitatorForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.loggedInUser$.id, [Validators.required]),
      pid: new FormControl(this.currItem$.pid, [Validators.required]),
      product_name: new FormControl(this.currItem$.product_name, [Validators.required]),
      picture: new FormControl(this.currItem$.picture),
      price: new FormControl(this.currItem$.price)
    });
  }

  post(): void {
    console.log(this.facilitatorForm.value);
    this.cartCrudService.post(this.facilitatorForm.value).subscribe();
    this.router.navigate(["shop"]);

  }
  productStuff(): void {
    console.log(this.currItem$);
    let myContainer = document.getElementById('productInfo') as HTMLElement;
    //myContainer.innerHTML = "Hello <b>" + this.currItem$.description + "</b> !!!";
    myContainer.innerHTML = "    <table style='width: 50%; margin: auto; text-align: center;' border=1> <tr>     <th>Product Id</th>        <th>Product Name</th>    </tr>    <tr>        <td>" +
      this.currItem$.pid + "</td>        <td>" + this.currItem$.product_name + "</td>    </tr></table>";
  }

  cancel(): void {
    sessionStorage.removeItem('currentItem');
    this.router.navigate(["shop"]);
  }


  addToCart(): void {
    console.log(this.currItem$);
  }

}
