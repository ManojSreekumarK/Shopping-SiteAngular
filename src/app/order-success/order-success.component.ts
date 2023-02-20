import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NavbarService } from '../shared/navbar.service';
import { Cart } from 'src/app/shared/cart';
import { Orders } from 'src/app/shared/orders';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss'],
})
export class OrderSuccessComponent implements OnInit {
  productData: any = [];
  total = 0;
  orderform!: FormGroup;
  orderObj: Orders = {
    id: '',
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    country: '',
    card: '',
    zip: 0,
    order: [],
    total: 0,
  };
  constructor(
    public nav: NavbarService,
    private pro: ProductService,
    private route: Router,
    private fb: FormBuilder
  ) {
    this.orderform = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required],
      card: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.nav.show();
    this.getAllCart();
  }
  getAllCart() {
    let ryu = 0;
    this.pro.getCart().subscribe((res: Cart[]) => {
      console.log(res);
      this.productData = res;
      let len = this.productData.length;
      for (let i = 0; i < len; i++) {
        ryu = ryu + this.productData[i].price * this.productData[i].count;
      }
      this.total = ryu;
      console.log(this.total);
    });
  }
  addOrders() {
    const { value } = this.orderform;
    console.log(value);
    (this.orderObj.id = ''),
      (this.orderObj.name = value.name),
      (this.orderObj.email = value.email),
      (this.orderObj.address = value.address),
      (this.orderObj.city = value.city),
      (this.orderObj.state = value.state),
      (this.orderObj.zip = value.zip),
      (this.orderObj.country = value.country),
      (this.orderObj.order = this.productData),
      (this.orderObj.total = this.total),
      (this.orderObj.card = value.card);

    this.pro.addOrder(this.orderObj).then((order) => {
      if (order) {
        alert('Order Confirmed');
        this.orderform.reset();
        this.route.navigate(['/home']);
      }
    });
  }
  clearCart() {
    this.pro.getCart().subscribe((res: Cart[]) => {
      console.log(res);
      let len = res.length;
      for (let i = 0; i < len; i++) {
        this.pro.deleteFromCart(res[i]);
      }
    });
  }
}
