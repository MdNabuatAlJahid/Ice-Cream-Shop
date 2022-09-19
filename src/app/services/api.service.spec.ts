import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from './api.service';
describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should get all products', () => {
    service.getProducts().subscribe((res) => {
      expect(res).toBeTruthy();
    });
  });
  it('Should post product', () => {
    let product = {
      productName: 'Chocolate',
      category: ['Cream ice cream'],
      ingredients: 'vanilla extract',
      foodIntolerances: 'None',
      nutritionValue: 1200,
      buyingPrice: 15,
      sellingPrice: 20,
      id: 1,
    };
    service.postProduct(product).subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res).toEqual(product);
    });
  });
});
