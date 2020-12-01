import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCrudService } from 'src/app/services/product-crud.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products$: Observable<Product[]>
  singleItem$: Observable<Product>;
  constructor(private productCrudService: ProductCrudService, private router: Router) { }

  ngOnInit(): void {
    this.singleItem$ = null
    this.products$ = this.productCrudService.fetchAll()
  }

  async viewProduct(pid: number): Promise<void> {
    this.singleItem$ = this.productCrudService.getProduct(pid);
    //console.log(this.singleItem$);
    this.singleItem$.forEach(value => console.log([value][0]));
    try {
      await this.singleItem$.forEach(value => sessionStorage.setItem('currentItem', JSON.stringify([value][0])));
    }
    catch {
      console.log('error retrieving from db');
    }

    this.router.navigate(["viewItem"]);
  }
}
