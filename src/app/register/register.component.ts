import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { NavbarService } from '../shared/navbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';
  constructor(private auth: AuthService, public nav: NavbarService) {}

  ngOnInit() {
    this.nav.hide();
  }

  register() {
    if (this.email == '') {
      alert('Please enter Email');
      return;
    }
    if (this.password == '') {
      alert('please enter password');
      return;
    }

    this.auth.register(this.email, this.password);
    this.email = '';
    this.password = '';
  }
}
