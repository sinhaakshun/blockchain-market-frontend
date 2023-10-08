import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service'; 
import { ethers } from "ethers";
import { OrderService } from '../user/order.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // loading: boolean = false;
  isLoggedIn: boolean = false;
  user: any = {};
  cart: string[] = [];
  products: any[] = [];
  timestamp : any;
  userAddress: any;

  redirectTo : string = './list'

  constructor(private userService: UserService, private orderService : OrderService) {}

  ngOnInit() {
    console.log('Start ', window.ethereum);
    if(localStorage.getItem('user')){
      window.location.href = this.redirectTo ;
    }

    if (this.userService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.user = this.userService.getUser();
      console.log('user data ' , this.user);
    }
  }

  handleLogin() {
    // this.loading = true;
    this.userService.login()
      .then(() => {
        this.isLoggedIn = true;
        this.user = this.userService.getUser();
        const data = JSON.stringify(this.user);
        localStorage.setItem('user', data)
        window.location.href = this.redirectTo ;
      })
      .catch((error) => {
        console.error("Error logging in with Metamask:", error);
      });
  }
  
}
