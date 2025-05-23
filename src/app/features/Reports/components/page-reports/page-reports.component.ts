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
interface Food {
  value: string;
  viewValue: string;
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
    MatDividerModule
   
  ],
  templateUrl: './page-reports.component.html',
  styleUrl: './page-reports.component.scss'
})
export class PageReportsComponent {
 foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
   anios: any[] = [
    {value: '0', viewValue: '2023'},
    {value: '1', viewValue: '2024'},
    {value: '2', viewValue: '2025'},
  ];
   meses: any []= [
    {value: '0', viewValue: 'Enero'},
    {value: '1', viewValue: 'Febrero'},
    {value: '2', viewValue: 'Marzo'},
  ];
}
