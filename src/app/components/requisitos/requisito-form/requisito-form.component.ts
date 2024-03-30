import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { requisitoService } from '../../../services/requisito.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { requisito } from '../../../models/requisito.model';

@Component({
  selector: 'app-requisito-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule],
  templateUrl: './requisito-form.component.html',
  styleUrl: './requisito-form.component.css'
})
export class RequisitoFormComponent {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private requisitoService: requisitoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    const requisito: requisito = activatedRoute.snapshot.data['requisito'];

    this.formGroup = formBuilder.group({
      id: [(requisito && requisito.id) ? requisito.id : null],
      processador: [(requisito && requisito.processador) ? requisito.processador : '', Validators.required],
      memoria: [(requisito && requisito.memoria) ? requisito.memoria : '', Validators.required],
      armazenamento: [(requisito && requisito.armazenamento) ? requisito.armazenamento : '', Validators.required],
      placaVideo: [(requisito && requisito.placaVideo) ? requisito.placaVideo : '', Validators.required],
      sistemaOperacional: [(requisito && requisito.sistemaOperacional) ? requisito.sistemaOperacional : '', Validators.required],    
    });

  }

  salvar() {
    if (this.formGroup.valid) {
      const requisito = this.formGroup.value;
      if (requisito.id ==null) {
        this.requisitoService.insert(requisito).subscribe({
          next: (requisitoCadastrado) => {
            this.router.navigateByUrl('/requisitos');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.requisitoService.update(requisito).subscribe({
          next: (requisitoAlterado) => {
            this.router.navigateByUrl('/requisitos');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          }
        });
      }
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const requisito = this.formGroup.value;
      if (requisito.id != null) {
        this.requisitoService.delete(requisito).subscribe({
          next: () => {
            this.router.navigateByUrl('/requisitos');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

}
