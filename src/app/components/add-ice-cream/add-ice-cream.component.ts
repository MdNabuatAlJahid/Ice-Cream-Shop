import { ProductsService } from './../../services/products.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

export interface category {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subcategories?: category[];
}

@Component({
  selector: 'app-add-ice-cream',
  templateUrl: './add-ice-cream.component.html',
  styleUrls: ['./add-ice-cream.component.scss'],
})
export class AddIceCreamComponent implements OnInit {
  productFrom!: FormGroup;
  ingrediancesList = ['vanilla extract', 'Condenced Milk', 'Heavy cream'];
  //Catagory
  category: category = {
    name: 'Category',
    completed: false,
    color: 'primary',
    subcategories: [
      { name: 'Cream ice cream', completed: false, color: 'primary' },
      { name: 'Fruit ice cream', completed: false, color: 'accent' },
      { name: 'Water ice cream', completed: false, color: 'warn' },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private matDialogRef: MatDialogRef<AddIceCreamComponent>,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    //Form control
    this.productFrom = this.formBuilder.group({
      productName: ['', Validators.required],
      category: [[], Validators.required],
      ingredients: ['', Validators.required],
      foodIntolerances: ['', Validators.required],
      nutritionValue: ['', Validators.required],
      buyingPrice: ['', Validators.required],
      sellingPrice: ['', Validators.required],
    });
  }

  allComplete: boolean = false;

  updateAllComplete(event: any, subCategoryName: string) {
    const tempCatList =
      (this.productFrom.get('category')?.value as string[]) || [];
    if (event.checked) {
      tempCatList.push(subCategoryName);
    } else {
      const index = tempCatList.indexOf(subCategoryName);
      if (index > -1) {
        tempCatList.splice(index, 1);
      }
    }
    this.productFrom.get('category')?.patchValue(tempCatList);
  }

  //Add Product
  addProduct() {
    if (this.productFrom.valid) {
      if (
        !this.productService.isExists(
          this.productFrom.get('productName')?.value
        )
      ) {
        this.apiService.postProduct(this.productFrom.value).subscribe(
          (res) => {
            this.productService.setProduct(res);
            this.productFrom.reset();
            this.matDialogRef.close();
            this.snackBar.open('Product added Successfully', 'Dismiss', {
              duration: 2000,
            });
          },
          (err) => {
            this.productFrom.reset();
            this.snackBar.open('Fail to add product', 'Dismiss', {
              duration: 2000,
            });
          }
        );
      } else {
        this.snackBar.open('Product already exists', 'Dismiss', {
          duration: 2000,
        });
      }
    }
  }
}
