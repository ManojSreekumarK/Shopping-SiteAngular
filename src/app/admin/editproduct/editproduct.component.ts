import { ProductService } from './../../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/shared/navbar.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Product } from 'src/app/shared/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss'],
})
export class EditproductComponent implements OnInit {
  editform!: FormGroup;

  editObj: Product = {
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
    private route: Router,
    private actRoute: ActivatedRoute
  ) {
    this.editform = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      url: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.nav.show();
    const id = this.actRoute.snapshot.paramMap.get('id');
    const ref = this.pro.GetProductById(id);
    console.log(ref);
  }

  updateProduct() {
    const ids = this.actRoute.snapshot.paramMap.get('id');
    const { value } = this.editform;
    console.log(value);

    (this.editObj.title = value.title),
      (this.editObj.price = value.price),
      (this.editObj.category = value.category),
      (this.editObj.url = value.url);

    this.pro.updateProduct(ids, this.editObj).then(() => {
      alert('Product data updated');
    });
    this.editform.reset();
    this.route.navigate(['admin/products']);
  }
}
