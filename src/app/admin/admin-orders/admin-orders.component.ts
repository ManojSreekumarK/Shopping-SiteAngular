import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/shared/navbar.service';
@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
})
export class AdminOrdersComponent implements OnInit {
  constructor(public nav: NavbarService) {}

  ngOnInit() {
    this.nav.show();
  }
}
