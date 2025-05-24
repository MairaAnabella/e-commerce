
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { UserService } from '../user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService: UserService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    const usuarioEnMemoria = this.usuarioService.isUsuarioSeleccionado();
    const banderaLocalStorage = localStorage.getItem('usuarioSeleccionado') === 'true';

    if (usuarioEnMemoria || banderaLocalStorage) {
      return true;
    }

  
    return this.router.parseUrl('/');
  }
}
