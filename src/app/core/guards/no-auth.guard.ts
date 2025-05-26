import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const datosUsuario = localStorage.getItem('datosUsuario');

    if (datosUsuario) {
      this.router.navigate(['dashboard']); // Redirigí a la ruta que quieras
      return false;
    }

    return true;
  }
}
