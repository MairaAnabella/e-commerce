import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../../config/config'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FechaSimuladaService {


   constructor(private http: HttpClient) {}

     getfechaEspecial(): Observable<any> {
    return this.http.get(API_CONFIG.apiUrl+'fechaEspecial');
  }
}
