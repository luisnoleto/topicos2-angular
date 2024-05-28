import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DialogModule } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';

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
    ToolbarComponent,
    MatPaginatorModule,
    DialogModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
//export class AppComponent {
//title = 'angular-loja-games';
//}
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .subscribe((data) => {
        console.log(data);
      });
  }
}
