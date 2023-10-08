import { Component, OnInit } from '@angular/core';
import { OrderService } from '../user/order.service';
import { HttpClient } from '@angular/common/http';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  filterUserAddress: string = '';
  filterFromDate: string = '';
  filterToDate : string = '';
  filterProductId: string = '';

  Orders : any = [];


  constructor(private orderService : OrderService, private http: HttpClient){
  }

  ngOnInit(){

    this.orderService.getAllOrders().subscribe(res =>{
      console.log('respnse ', res)
      this.Orders = res;
      
    })
  }

  applyFilters() {
    this.orderService
      .filterOrders(this.filterUserAddress, this.filterFromDate, this.filterToDate, this.filterProductId)
      .subscribe(
        (filteredOrders: any[]) => {
          this.Orders = filteredOrders;
        },
        (error: any) => {
          console.error('Error filtering orders:', error);
        }
      );
  }


}
