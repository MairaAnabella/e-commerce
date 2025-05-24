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
import { User } from '../../../../shared/interfaces/user';
import { UserService } from '../../../../core/user.service';


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
  users: User[] = [];
  nombreUser: string = '';
  hide = signal(true);

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => this.users = data);
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }


  ingresar(): void {
    const seleccionado = this.users.find(u => u.id === this.clienteSeleccionado);

    if (seleccionado) {
      this.userService.setUsuario(seleccionado);
      localStorage.setItem('usuarioSeleccionado', 'true'); 
      this.router.navigate(['/dashboard']);
    }


  }


}
