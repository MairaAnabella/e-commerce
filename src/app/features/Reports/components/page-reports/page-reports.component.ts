import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../../shared/header/header.component";
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { API_CONFIG } from '../../../../config/config';
import { ClientesVipService } from '../../services/clientes-vip.service';
export interface ClienteVIP {
  id: number;
  name: string;
  email: string;
  fecha_alta: string | null;
  fecha_baja: string | null;
}


@Component({
  selector: 'app-page-reports',
  imports: [
    HeaderComponent,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    FormsModule

  ],
  templateUrl: './page-reports.component.html',
  styleUrl: './page-reports.component.scss'
})
export class PageReportsComponent {


  anioSeleccionado: string = '';
  mesSeleccionado: string = '';
  clientes: ClienteVIP[] = [];
  url?: string;


  anios = [
    { value: '2024', viewValue: '2024' },
    { value: '2025', viewValue: '2025' },
    // Agregá más años si necesitás
  ];

  meses = [
    { value: '01', viewValue: 'Enero' },
    { value: '02', viewValue: 'Febrero' },
    { value: '03', viewValue: 'Marzo' },
    { value: '04', viewValue: 'Abril' },
    { value: '05', viewValue: 'Mayo' },
    { value: '06', viewValue: 'Junio' },
    { value: '07', viewValue: 'Julio' },
    { value: '08', viewValue: 'Agosto' },
    { value: '09', viewValue: 'Septiembre' },
    { value: '10', viewValue: 'Octubre' },
    { value: '11', viewValue: 'Noviembre' },
    { value: '12', viewValue: 'Diciembre' }
  ];
  tipoSeleccionado: string = 'actuales';
  constructor(private http: HttpClient, private clienteService:ClientesVipService) { }

  obtenerClientesVip(): void {
    console.log('hola');
    const urlBase = API_CONFIG.apiUrl + 'reportes/clientes-vip-actuales';

    fetch(urlBase)
      .then(res => {
        if (!res.ok) throw new Error('Error al consultar los clientes');
        return res.json();
      })
      .then((data: ClienteVIP[]) => {
        this.clientes = data;
      })
      .catch(err => {
        console.error('Error al obtener reporte:', err);
      });

  }


obtenerClientes(): void {
  const mes = Number(this.mesSeleccionado);
const anio = Number(this.anioSeleccionado);
console.log(this.tipoSeleccionado)
  if (this.tipoSeleccionado === 'actuales') {
    this.obtenerClientesVip();
  } else if (this.tipoSeleccionado === 'alta') {
    this.clienteService.getAltasVip(mes, anio).subscribe({
      next: (data) => this.clientes = data,
      error: (err) => console.error('Error al obtener altas VIP:', err)
    });
  } else if (this.tipoSeleccionado === 'baja') {
    this.clienteService.getBajasVip(mes,anio).subscribe({
      next: (data) => this.clientes = data,
      error: (err) => console.error('Error al obtener bajas VIP:', err)
    });
  }
}


}
