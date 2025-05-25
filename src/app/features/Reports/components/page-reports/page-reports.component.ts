import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../../shared/header/header.component";
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { API_CONFIG } from '../../../../config/config';
export interface ClienteVIP {
  id: number;
  nombre: string;
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
  
 tipoConsulta: string = 'actuales'; // 'actuales', 'alta', 'baja'
  anioSeleccionado: string = '';
  mesSeleccionado: string = '';
  clientes: ClienteVIP[] = [];

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
  constructor(private http: HttpClient) {}
resultados: ClienteVIP[] = [];
  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes(): void {
 const urlBase = 'http://localhost:8000/api/clientes-vip'; // Ajustá si cambia

  let endpoint = '';
  if (this.tipoSeleccionado === 'actuales') {
    endpoint = 'actuales';
  } else if (this.tipoSeleccionado === 'alta') {
    endpoint = 'alta';
  } else if (this.tipoSeleccionado === 'baja') {
    endpoint = 'baja';
  }

  const url = `${urlBase}/${endpoint}?anio=${this.anioSeleccionado}&mes=${this.mesSeleccionado}`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error('Error al consultar los clientes');
      return res.json();
    })
    .then((data: ClienteVIP[]) => {
      this.resultados = data;
    })
    .catch(err => {
      console.error('Error al obtener reporte:', err);
    });
}

generarReporte() {
  const body = {
    anio: this.anioSeleccionado,
    mes: this.mesSeleccionado,
  };

  let endpoint = '';
  switch (this.tipoSeleccionado) {
    case 'actuales':
      endpoint = 'clientes-vip-actuales';
      break;
    case 'alta':
      endpoint = 'clientes-alta-vip';
      break;
    case 'baja':
      endpoint = 'clientes-baja-vip';
      break;
    default:
      return;
  }

  this.http.post<ClienteVIP[]>(`${API_CONFIG.apiUrl}reportes/${endpoint}`, body)
    .subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (err) => {
        console.error('Error al generar el reporte:', err);
      }
    });
}

  /* generarReporte(): void {
    this.obtenerClientes();
  } */
}
