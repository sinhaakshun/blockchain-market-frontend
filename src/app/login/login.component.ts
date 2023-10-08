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
    // this.products = [
    //   {
    //     id: "0x01".padEnd(66, "0"),
    //     name: "Laptop",
    //     description: "High-performance laptop with the latest processor.",
    //     price: ethers.utils.parseEther("0.00001"),
    //   },
    //   {
    //     id: "0x02".padEnd(66, "0"),
    //     name: "Smartphone",
    //     description: "Feature-rich smartphone with a high-resolution camera.",
    //     price: ethers.utils.parseEther("0.00002"),
    //   },
    //   {
    //     id: "0x03".padEnd(66, "0"),
    //     name: "Headphones",
    //     description:
    //       "Wireless noise-canceling headphones for an immersive audio experience.",
    //     price: ethers.utils.parseEther("0.00003"),
    //   },
    //   {
    //     id: "0x04".padEnd(66, "0"),
    //     name: "Smartwatch",
    //     description: "Fitness tracker smartwatch with a heart rate monitor.",
    //     price: ethers.utils.parseEther("0.00004"),
    //   },
    //   {
    //     id: "0x05".padEnd(66, "0"),
    //     name: "4K TV",
    //     description: "Ultra HD 4K TV with HDR support for stunning visuals.",
    //     price: ethers.utils.parseEther("0.00005"),
    //   },
    //   {
    //     id: "0x06".padEnd(66, "0"),
    //     name: "Gaming Console",
    //     description: "Next-gen gaming console with powerful graphics capabilities.",
    //     price: ethers.utils.parseEther("0.00006"),
    //   },
    //   {
    //     id: "0x07".padEnd(66, "0"),
    //     name: "Camera",
    //     description: "Professional DSLR camera for capturing high-quality photos.",
    //     price: ethers.utils.parseEther("0.00007"),
    //   },
    //   {
    //     id: "0x08".padEnd(66, "0"),
    //     name: "Tablet",
    //     description: "Slim and lightweight tablet for productivity on the go.",
    //     price: ethers.utils.parseEther("0.00008"),
    //   },
    //   {
    //     id: "0x09".padEnd(66, "0"),
    //     name: "Wireless Speakers",
    //     description: "Portable wireless speakers for music enthusiasts.",
    //     price: ethers.utils.parseEther("0.00009"),
    //   },
    //   {
    //     id: "0x0A".padEnd(66, "0"),
    //     name: "Desktop Computer",
    //     description: "Powerful desktop computer for gaming and productivity tasks.",
    //     price: ethers.utils.parseEther("0.00010"),
    //   },
    // ];

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

  // updateCart(productId: string) {
  //   if (this.cart.includes(productId)) {
  //     this.cart = this.cart.filter((id) => id !== productId);
  //   } else {
  //     this.cart.push(productId);
  //     console.log('cart ',this.cart)
  //   }
  // }


  // checkoutToSign(productIds: string[]) {
  //   const contract = this.userService.getContract();
  
  //   this.user = this.userService.getUser();
  //   this.userAddress = this.user.address;
  //   console.log('addresss :', this.userAddress);
  
  //   console.log('contract', contract);
  //   console.log('product ids ', productIds);
  
  //   if (!contract) {
  //     console.log('Contract is not initialized.');
  //     return;
  //   }
  
  //   const selectedProducts = this.products.filter((product) =>
  //     productIds.includes(product.id));
    
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const contractWithProvider = contract.connect(provider);
  //   const eventFilter = contractWithProvider.filters['OrderPlaced'](null, null, null);
  
  //   contract['placeOrder'](productIds)
  //     .then((transaction: any) => {
  //       console.log('Transaction sent:', transaction.hash);
  //       alert('Transaction successfully');
  
  //       contractWithProvider.on(eventFilter, (user, eventProductIds, timestamp, event) => {
  //         console.log('OrderPlaced event received:', event);
          
  //         this.orderService.storeOrder(user, eventProductIds, timestamp)
  //           .subscribe((response) => {
  //             console.log('Order stored successfully:', response);
  //           }, (error) => {
  //             console.error('Error storing order:', error);
  //           });
  //       });
  //       // window.location.href = this.redirectTo;
  //     })
  //     .catch((error: any) => {
  //       console.error('Error sending transaction:', error);
  //     });
  // }
  




  // formatPrice(priceInWei: string) {
  //   const priceInEth = ethers.utils.formatEther(priceInWei);
  //   return `${priceInEth} ETH`;
  // }
  
}
