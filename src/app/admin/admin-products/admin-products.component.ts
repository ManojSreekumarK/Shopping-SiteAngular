import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/shared/navbar.service';
import { ProductService } from './../../shared/product.service';
import { Product } from 'src/app/shared/product';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit {
  productData: any = [];
  query = '';
  constructor(public nav: NavbarService, private pro: ProductService) {}

  ngOnInit() {
    this.nav.show();
    this.make(this.query);
  }

  getAllProducts() {}

  deleteProduct(product: Product) {
    let des = confirm('Are you sure you want to delete this product?');
    if (des == true) {
      this.pro.deleteProduct(product);
    }
  }
  async make(query: string) {
    if (query == '') {
      this.pro.getProduct().subscribe((res: Product[]) => {
        console.log(res);
        this.productData = res;
      });
    } else {
      const str = query.toLowerCase();
      const str2 = str.charAt(0).toUpperCase() + str.slice(1);
      this.productData = await this.pro.getProductSearch(str2);
      console.log(this.productData);
    }
  }
}
