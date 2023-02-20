import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../shared/navbar.service';
@Component({
  selector: 'tw-navbar',
  templateUrl: './tw-navbar.component.html',
  styleUrls: ['./tw-navbar.component.scss'],
})
export class TwNavbarComponent implements OnInit {
  constructor(public nav: NavbarService, private auth: AuthService) {}
  show: boolean = false;
  ngOnInit(): void {}
  dropdowntoggle() {
    this.show = !this.show;
  }
  logout() {
    this.auth.logout();
  }
  showMenu = false;
  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }
}
