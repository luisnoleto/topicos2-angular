import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {}
