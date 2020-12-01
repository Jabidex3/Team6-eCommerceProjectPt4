import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductCrudService } from 'src/app/services/product-crud.service';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss']
})
export class ViewItemComponent implements OnInit {
  currItem$: Product;
  constructor(private productCrudService: ProductCrudService, private router: Router) { }

  ngOnInit(): void {
    this.currItem$ = JSON.parse(sessionStorage.getItem('currentItem'));
    this.productStuff();
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
