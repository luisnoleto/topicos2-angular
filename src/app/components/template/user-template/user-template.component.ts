import { Component } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-user-template',
  standalone: true,
  imports: [
    ToolbarComponent,
    FooterComponent,
    RouterOutlet,
    MatButton,
    MatIcon,
  ],
  templateUrl: './user-template.component.html',
  styleUrl: './user-template.component.css',
})
export class UserTemplateComponent {}
