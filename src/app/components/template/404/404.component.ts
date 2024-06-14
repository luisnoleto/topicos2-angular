import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-Error404',
  standalone: true,
  imports: [ RouterOutlet],
  templateUrl: './404.component.html',
  styleUrl: './404.component.css',
})
export class Error404Component {
  constructor(
    private location: Location
  ) {}

 voltarPagina(): void {
    this.location.back();
  }
}
