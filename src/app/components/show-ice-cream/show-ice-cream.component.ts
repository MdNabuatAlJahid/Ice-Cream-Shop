import { Product } from './../../model/product';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-show-ice-cream',
  templateUrl: './show-ice-cream.component.html',
  styleUrls: ['./show-ice-cream.component.scss'],
})
export class ShowIceCreamComponent implements OnInit {
  allProducts$: Observable<Product[]>;
  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getProducts();
    this.allProducts$ = this.productService.getProductsObservable();
  }
}
