import { Component } from '@angular/core';
import { UserService } from '../user/user.service'; 
import { ethers } from "ethers";
import { OrderService } from '../user/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  isLoggedIn: boolean = false;
  user: any = {};
  cart: string[] = [];
  products: any[] = [];
  timestamp : any;
  userAddress: any;
  val : any;

  redirectTo : string = './orders'

  constructor(private userService: UserService, private orderService : OrderService, private router: Router) {}

  ngOnInit() {
    this.products = [
      {
        id: "0x01".padEnd(66, "0"),
        name: "Laptop",
        description: "High-performance laptop with the latest processor.",
        price: ethers.utils.parseEther("0.00001"),
      },
      {
        id: "0x02".padEnd(66, "0"),
        name: "Smartphone",
        description: "Feature-rich smartphone with a high-resolution camera.",
        price: ethers.utils.parseEther("0.00002"),
      },
      {
        id: "0x03".padEnd(66, "0"),
        name: "Headphones",
        description:
          "Wireless noise-canceling headphones for an immersive audio experience.",
        price: ethers.utils.parseEther("0.00003"),
      },
      {
        id: "0x04".padEnd(66, "0"),
        name: "Smartwatch",
        description: "Fitness tracker smartwatch with a heart rate monitor.",
        price: ethers.utils.parseEther("0.00004"),
      },
      {
        id: "0x05".padEnd(66, "0"),
        name: "4K TV",
        description: "Ultra HD 4K TV with HDR support for stunning visuals.",
        price: ethers.utils.parseEther("0.00005"),
      },
      {
        id: "0x06".padEnd(66, "0"),
        name: "Gaming Console",
        description: "Next-gen gaming console with powerful graphics capabilities.",
        price: ethers.utils.parseEther("0.00006"),
      },
      {
        id: "0x07".padEnd(66, "0"),
        name: "Camera",
        description: "Professional DSLR camera for capturing high-quality photos.",
        price: ethers.utils.parseEther("0.00007"),
      },
      {
        id: "0x08".padEnd(66, "0"),
        name: "Tablet",
        description: "Slim and lightweight tablet for productivity on the go.",
        price: ethers.utils.parseEther("0.00008"),
      },
      {
        id: "0x09".padEnd(66, "0"),
        name: "Wireless Speakers",
        description: "Portable wireless speakers for music enthusiasts.",
        price: ethers.utils.parseEther("0.00009"),
      },
      {
        id: "0x0A".padEnd(66, "0"),
        name: "Desktop Computer",
        description: "Powerful desktop computer for gaming and productivity tasks.",
        price: ethers.utils.parseEther("0.00010"),
      },
    ];

    console.log('Start ', window.ethereum)

    const data = localStorage.getItem('user')
    console.log('akmkmlskml ', data)

    if (data) {
      this.isLoggedIn = true;
      this.user = JSON.parse(data);
      console.log(' user data ', this.user.address)
    }
    else{
      this.router.navigate(['/']);
    }
  }


  updateCart(productId: string) {
    if (this.cart.includes(productId)) {
      this.cart = this.cart.filter((id) => id !== productId);
    } else {
      this.cart.push(productId);
      console.log('cart ',this.cart)
    }
  }


  checkoutToSign(productIds: string[]) {
    const contract = this.userService.getContract();

    this.val = localStorage.getItem('user');
    this.user = JSON.parse(this.val)

    console.log('user ',this.user)
    this.userAddress = this.user.address;
    console.log('addresss :', this.userAddress);
  
    console.log('contract', contract);
    console.log('product ids ', productIds);
  
    if (!contract) {
      console.log('Contract is not initialized.');
      return;
    }
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contractWithProvider = contract.connect(provider);
    const eventFilter = contractWithProvider.filters['OrderPlaced'](null, null, null);
  
    contract['placeOrder'](productIds)
      .then((transaction: any) => {
        console.log('Transaction sent:', transaction.hash);
        alert('Transaction successfully');
  
        contractWithProvider.on(eventFilter, (user, eventProductIds, timestamp, event) => {
          console.log('OrderPlaced event received:', event);
          
          this.orderService.storeOrder(user, eventProductIds, timestamp)
            .subscribe((response) => {
              console.log('Order stored successfully:', response);
              window.location.href = this.redirectTo;

            }, (error) => {
              console.error('Error storing order:', error);
            });
        });

        // setTimeout(() => {
        //   window.location.href = this.redirectTo;
        // }, 12000)
        // window.location.href = this.redirectTo;
      })
      .catch((error: any) => {
        console.error('Error sending transaction:', error);
      });
  }

  formatPrice(priceInWei: string) {
    const priceInEth = ethers.utils.formatEther(priceInWei);
    return `${priceInEth} ETH`;
  }

}
