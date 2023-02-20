import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../shared/navbar.service';
import { Orders } from 'src/app/shared/orders';
import { ProductService } from 'src/app/shared/product.service';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {
  productData: any = [];
  total = 0;
  constructor(public nav: NavbarService, private pro: ProductService) {}

  ngOnInit() {
    this.nav.show();
    this.getOrders();
  }

  getOrders() {
    let ryu = 0;
    this.pro.getOrder().subscribe((res: Orders[]) => {
      console.log(res);
      this.productData = res;
      let len = this.productData;
      for (let j = 0; j < len; j++) {
        let ryu = 0;
        let ben = this.productData.order.length;
        for (let i = 0; i < ben; i++) {
          ryu =
            ryu +
            this.productData.order[i].price * this.productData.order[i].count;
        }
        this.total = ryu;
      }
    });
  }
}
