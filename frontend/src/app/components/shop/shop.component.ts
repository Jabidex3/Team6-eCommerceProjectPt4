import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCrudService } from 'src/app/services/product-crud.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products$: Observable<Product[]>
  constructor(private productCrudService: ProductCrudService, private router: Router) { }

  ngOnInit(): void {
    this.products$ = this.productCrudService.fetchAll()
  }

}
