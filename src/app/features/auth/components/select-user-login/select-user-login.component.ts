import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


interface User {
  id: string;
  nombre: string;
}

@Component({
  selector: 'app-select-user-login',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    FormsModule


  ],
  templateUrl: './select-user-login.component.html',
  styleUrl: './select-user-login.component.scss'
})
export class SelectUserLoginComponent {
  clienteSeleccionado: any = null;
  users: User[] = [
    { id: '0', nombre: 'Miguel Lopez (VIP)' },
    { id: '1', nombre: 'Melany Rojas' },
    { id: '1', nombre: 'Juan Perez (VIP)' },
  ];
  hide = signal(true);
  constructor(private router: Router) { }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }


  ingresar(): void {

    console.log(this.clienteSeleccionado)
    this.users.forEach(user => {
      if (this.clienteSeleccionado) {
        localStorage.setItem('clienteId', user.id);
        localStorage.setItem('clienteNombre', user.nombre);
        this.router.navigate(['/dashboard']);
      }
    });


  }


}
