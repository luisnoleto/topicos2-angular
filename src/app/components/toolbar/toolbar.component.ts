import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbar,
    MatIconModule,
    MatButton,
    MatFormField,
    MatMenuModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {}
