import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  REST_API: string = 'http://localhost:4000/api';
 
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}


  storeOrder(userAddress : string, productId: string, timestamp : any){
    const params = {
      userAddress : userAddress,
      productId : productId,
      timestamp : timestamp
    }
    let API_URL = `${this.REST_API}/storeOrders`;
    return this.http.post(API_URL, {params})
  }

  getAllOrders(){
    let API_URL = `${this.REST_API}/getAllData`;
    return this.http.get(API_URL);
  }

  filterOrders(userAddress: string, startTime : string, endTime: string, productId: string): Observable<any[]> {
    const params = {
      userAddress: userAddress,
      startTime: startTime,
      endTime : endTime,
      productId: productId,
    };

    return this.http.get<any[]>(`${this.REST_API}/filter`, { params });
  }


}
