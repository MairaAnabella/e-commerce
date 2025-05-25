import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../../config/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface ClienteVIP {
  id: number;
  name: string;
  email: string;
  fecha_alta: string | null;
  fecha_baja: string | null;
}
@Injectable({
  providedIn: 'root'
})
export class ClientesVipService {

  constructor(private http:HttpClient) { }
  
getAltasVip(mes: number, anio: number) : Observable<ClienteVIP[]> {
  return this.http.post<ClienteVIP[]>(`${API_CONFIG.apiUrl}reportes/clientes-alta-vip`, { mes, anio });
}

getBajasVip(mes: number, anio: number): Observable<ClienteVIP[]>  {
  return this.http.post<ClienteVIP[]>(`${API_CONFIG.apiUrl}reportes/clientes-baja-vip`, { mes, anio });
}
}
