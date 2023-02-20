import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../shared/navbar.service';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/shared/product';
import { Cart } from 'src/app/shared/cart';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productData: any = [];
  query = '';
  constructor(public nav: NavbarService, private pro: ProductService) {}
  CartObj: Cart = {
    id: '',
    title: '',
    price: 0,
    category: '',
    url: '',
    count: 0,
  };
  ngOnInit() {
    this.nav.show();
    this.make(this.query);
  }
  async make(query: string) {
    if (query == '') {
      this.pro.getProduct().subscribe((res: Product[]) => {
        console.log(res);
        this.productData = res;
      });
    } else {
      this.productData = await this.pro.getCategorySearch(query);
      console.log(this.productData);
    }
  }

  addToCart(cart: Product) {
    (this.CartObj.id = ''),
      (this.CartObj.title = cart.title),
      (this.CartObj.price = cart.price),
      (this.CartObj.category = cart.category),
      (this.CartObj.url = cart.url),
      (this.CartObj.count = 1);
    this.pro.addToCart(this.CartObj).then((product) => {
      if (product) {
        alert('Added to Cart Successfully');
      }
    });
  }
}
