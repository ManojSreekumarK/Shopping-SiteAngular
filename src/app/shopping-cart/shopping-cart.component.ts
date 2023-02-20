import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarService } from '../shared/navbar.service';
import { ProductService } from 'src/app/shared/product.service';
import { Cart } from 'src/app/shared/cart';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  productData: any = [];
  total = 0;
  constructor(
    public nav: NavbarService,
    private pro: ProductService,
    private route: Router
  ) {}

  ngOnInit() {
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
  deleteFromCart(cart: Cart) {
    let des = confirm(
      'Are you sure you want to remove this Product from cart?'
    );
    if (des == true) {
      this.pro.deleteFromCart(cart);
    }
  }

  countUp(id: string, c: number) {
    if (c <= 10) {
      this.pro.updateCount(id, c + 1);
    } else {
      alert('Cannot buy more than 10 items');
    }
  }
  countDown(id: string, c: number) {
    if (c <= 1) {
      alert('Cannot lower quantity below 1');
    } else {
      this.pro.updateCount(id, c - 1);
    }
  }
  reload() {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
}
