import { ProductService } from './../../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/shared/navbar.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Product } from 'src/app/shared/product';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productform!: FormGroup;
  productObj: Product = {
    id: '',
    title: '',
    price: 0,
    category: '',
    url: '',
  };
  constructor(
    public nav: NavbarService,
    private pro: ProductService,
    private fb: FormBuilder,
    private route: Router
  ) {
    this.productform = this.fb.group({
      title: ['', Validators.required],
      price: [0, Validators.required],
      category: ['', Validators.required],
      url: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.nav.show();
  }
  addProduct() {
    const { value } = this.productform;
    console.log(value);
    (this.productObj.id = ''),
      (this.productObj.title = value.title),
      (this.productObj.price = value.price),
      (this.productObj.category = value.category),
      (this.productObj.url = value.url);

    this.pro.addProduct(this.productObj).then((product) => {
      if (product) {
        alert('Data added Successfull');
        this.productform.reset();
        this.route.navigate(['admin/products']);
      }
    });
  }
}
