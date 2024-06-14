import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/template/header/header.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DialogModule } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { FooterComponent } from './components/template/footer/footer.component';
import { SidebarComponent } from './components/template/sidebar/sidebar.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPortuguesePaginatorIntl } from './services/portuguese-paginator-intl.service';
import { CommonModule } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    HeaderComponent,
    MatPaginatorModule,
    DialogModule,
    FooterComponent,
    SidebarComponent,
    CommonModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

//export class AppComponent {
//title = 'angular-loja-games';
export class AppComponent implements OnInit {
  constructor(private http: HttpClient, private matIconReg: MatIconRegistry) {}

  ngOnInit() {
    this.matIconReg.setDefaultFontSetClass('material-symbols-outlined');
    this.http
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .subscribe((data) => {
        console.log(data);
      });
  }
}
