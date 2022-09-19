import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../model/product';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products = new BehaviorSubject<Product[]>([]);
  constructor(private apiService: ApiService) {}

  getProducts() {
    this.apiService.getProducts().subscribe((res) => {
      this.products.next(res);
    });
  }

  getProductsObservable(): Observable<Product[]> {
    return this.products.asObservable();
  }
  setProduct(product: Product) {
    const prods = this.products.value;
    prods.push(product);
    this.products.next(prods);
  }

  isExists(productName: string) {
    if (!productName) {
      return false;
    }
    const filtered = this.products.value.filter(
      (item) => item.productName === productName
    );
    return filtered.length > 0;
  }
}
