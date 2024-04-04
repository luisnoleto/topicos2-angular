import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Plataforma } from '../../../models/plataforma.model';
import { PlataformaService } from '../../../services/plataforma.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Fabricante } from '../../../models/fabricante.model';
import { FabricanteService } from '../../../services/fabricante.service';

@Component({
  selector: 'app-plataforma-form',
  standalone: true,
  providers: [],
  // ...

  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    CommonModule,
    MatDatepickerModule,
    FormsModule,
    MatSelectModule,
  ],
  templateUrl: './plataforma-form.component.html',
  styleUrl: './plataforma-form.component.css',
})
export class PlataformaFormComponent {
  formGroup: FormGroup;
  fabricantes: Fabricante[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private plataformaService: PlataformaService,
    private fabricanteService: FabricanteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const plataforma: Plataforma = activatedRoute.snapshot.data['plataforma'];

    this.formGroup = formBuilder.group({
      id: plataforma && plataforma.id ? plataforma.id : null,
      nome: [
        plataforma && plataforma.nome ? plataforma.nome : '',
        Validators.required,
      ],
      fabricante: [
        plataforma && plataforma.fabricante ? plataforma.fabricante.id : null,
        Validators.required,
      ],
    });
  }
  ngOnInit(): void {
    this.fabricanteService.findAll().subscribe((data) => {
      this.fabricantes = data;
    });
  }

  salvar() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const plataforma = this.formGroup.value;
      console.log(plataforma.lista);

      const operacao =
        plataforma.id == null
          ? this.plataformaService.insert(plataforma)
          : this.plataformaService.update(plataforma);

      operacao.subscribe({
        next: () => this.router.navigateByUrl('/dev-fabricante'),
        error: (error: HttpErrorResponse) => {
          console.log('Erro ao salvar' + JSON.stringify(error));
          this.tratarErros(error);
        },
      });
    }
  }

  tratarErros(error: HttpErrorResponse) {
    if (error.status === 400) {
      if (error.error?.errors) {
        error.error.errors.forEach((validationError: any) => {
          const formControl = this.formGroup.get(validationError.fieldName);
          console.log(validationError);
          if (formControl) {
            console.log(formControl);
            formControl.setErrors({ apiError: validationError.message });
          }
        });
      }
    } else if (error.status < 400) {
      alert(error.error?.message || 'Erro não tratado.');
    } else if (error.status >= 500) {
      alert('Erro interno.');
    }
  }
  excluir() {
    if (this.formGroup.valid) {
      const plataforma = this.formGroup.value;
      if (plataforma.id != null) {
        this.plataformaService.delete(plataforma).subscribe({
          next: () => {
            this.router.navigateByUrl('/dev-fabricante');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          },
        });
      }
    }
  }
}
