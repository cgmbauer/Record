import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

interface IData {
  id: number;
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getUserDetails() {
    return this.http.get<IData>('http://localhost:3333/products')
    .subscribe(data => console.log(data));
  }

}
