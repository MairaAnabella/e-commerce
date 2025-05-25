import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../../config/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  constructor(private http: HttpClient) { }

    getProducto(): Observable<any> {
    return this.http.get(API_CONFIG.apiUrl+'producto');
  }
}
