import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/config';
@Injectable({ providedIn: 'root' })
export class UserService {
 
  private usuario: {id:number, nombre: string, email: string, isVip: boolean } | null = null;
  

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(API_CONFIG.apiUrl+'users');
  }



  setUsuario(user: any): void {
    this.usuario = {
      id:user.id,
      nombre: user.name,
      email: user.email,
      isVip: user.is_vip === 1
    };

    // Guarda en localStorage en formato JSON
    localStorage.setItem('usuarioSeleccionado', 'true');
    localStorage.setItem('datosUsuario', JSON.stringify(this.usuario));
  }

  getUsuario() {
    
    if (!this.usuario) {
      const datos = localStorage.getItem('datosUsuario');
      if (datos) {
        this.usuario = JSON.parse(datos);
      }
    }
    return this.usuario;
  }

  isUsuarioSeleccionado(): boolean {
    return this.getUsuario() !== null;
  }

  limpiarUsuario(): void {
    this.usuario = null;
    localStorage.removeItem('usuarioSeleccionado');
    localStorage.removeItem('fechaSeleccionada');
    localStorage.removeItem('datosUsuario');
  }


/* 
  getListaCarrito(): Observable<any> {
    return this.http.get(this.apiUrl+'listaCarrito');
  }

    getProductoCarrito(carritoId:any): Observable<any> {
      
    return this.http.get(`${this.apiUrl}carritos/${carritoId}/productoCarrito`);
  }

    getCarritoProducto(): Observable<any> {
    return this.http.get(this.apiUrl+'carritoProducto');
  }

    getCompras(): Observable<any> {
    return this.http.get(this.apiUrl+'compras');
  }

 
 
 */


}
