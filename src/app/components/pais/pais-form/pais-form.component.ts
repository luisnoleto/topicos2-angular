import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PaisService } from '../../../services/pais.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Pais } from '../../../models/pais.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-pais-form',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    RouterModule,
  ],
  templateUrl: './pais-form.component.html',
  styleUrl: './pais-form.component.css',
})
export class PaisFormComponent {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private paisService: PaisService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const pais: Pais = activatedRoute.snapshot.data['pais'];

    this.formGroup = formBuilder.group({
      id: [pais && pais.id ? pais.id : null],
      nome: [
        pais && pais.nome ? pais.nome : '',
        Validators.compose([Validators.required, Validators.minLength(4)]),
      ],
      sigla: [
        pais && pais.sigla ? pais.sigla : '',
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
    });
  }

  salvar() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const pais = this.formGroup.value;

      const operacao =
        pais.id == null
          ? this.paisService.insert(pais)
          : this.paisService.update(pais);

      operacao.subscribe({
        next: () => this.router.navigateByUrl('/pais'),
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
          const formControl = this.formGroup.get(validationError.fildName);
          if (formControl) {
            console.log(formControl);
            formControl.setErrors({ apiError: validationError.message });
          }
        });
      }
    } else if (error.status < 500) {
      alert(error.error?.message || 'Erro generico no enio do formulario');
    } else if (error.status >= 500) {
      alert('Erro interno do servidor. Por favor, tente novamente mais tarde.');
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const pais = this.formGroup.value;
      if (pais.id != null) {
        this.paisService.delete(pais).subscribe({
          next: () => {
            this.router.navigateByUrl('/pais');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          },
        });
      }
    }
  }

  errorMessages: { [controlName: string]: { [errorName: string]: string } } = {
    nome: {
      required: 'O nome deve ser informado.',
      minlength: 'O nome deve conter ao menos 4 caracteres',
    },
    sigla: {
      required: 'A sigla deve ser informada.',
      minlength: 'A sigla deve possuir no minímo 2 caracteres.',
      apiError: '',
    },
  };

  getErrorMessage(
    controlName: string,
    errors: ValidationErrors | null | undefined
  ): string {
    if (!errors) {
      return '';
    }

    for (const errorName in errors) {
      if (
        errors.hasOwnProperty(errorName) &&
        this.errorMessages[controlName][errorName]
      ) {
        return this.errorMessages[controlName][errorName];
      }
    }
    return 'Erro não mapeado (entre em contato com o desenvolvedor)';
  }
}
