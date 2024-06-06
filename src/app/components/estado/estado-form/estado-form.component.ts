import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EstadoService } from '../../../services/estado.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Estado } from '../../../models/estado.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-estado-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule],
  templateUrl: './estado-form.component.html',
  styleUrl: './estado-form.component.css'
})
export class EstadoFormComponent {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private estadoService: EstadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location) {

    const estado: Estado = activatedRoute.snapshot.data['estado'];

    this.formGroup = formBuilder.group({
      id: [(estado && estado.id) ? estado.id : null],
      nome: [(estado && estado.nome) ? estado.nome : '',
      Validators.compose([Validators.required,
      Validators.minLength(4)])],
      sigla: [(estado && estado.sigla) ? estado.sigla : '',
      Validators.compose([Validators.required,
      Validators.minLength(2), Validators.maxLength(2)])]
    });

  }

  salvar() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const estado = this.formGroup.value;

      const operacao = estado.id == null 
      ? this.estadoService.insert(estado) 
      : this.estadoService.update(estado);

      operacao.subscribe({
        next: () => this.voltarPagina(),
        error: (error:HttpErrorResponse) => {
          console.log('Erro ao salvar' + JSON.stringify(error));
          this.tratarErros(error);
        }
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
      };

    } else if (error.status < 400) {
      alert(error.error ?.message || 'Erro generico no enio do formulario');
    } else if (error.status >= 500) {
      alert('Erro interno do servidor. Por favor, tente novamente mais tarde.');
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const estado = this.formGroup.value;
      if (estado.id != null) {
        this.estadoService.delete(estado).subscribe({
          next: () => {
            this.voltarPagina();
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

  errorMessages: { [controlName: string]: { [errorName: string]: string } } = {

    nome: {
      required: 'O nome deve ser informado.',
      minlength: 'O nome deve conter ao menos 4 caracteres'
    },
    sigla: {
      required: 'A sigla deve ser informada.',
      minlength: 'A sigla deve possuir exatos 2 caracteres.',
      maxlength: 'A sigla deve possuir exatos 2 caracteres.',
      apiError: ''
    }
  }

  getErrorMessage(controlName: string, errors: ValidationErrors | null | undefined): string {
    if (!errors) {
      return '';
    }

    for (const errorName in errors) {
      if (errors.hasOwnProperty(errorName) && this.errorMessages[controlName][errorName]) {
        return this.errorMessages[controlName][errorName];
      }
    }
    return 'Erro não mapeado (entre em contato com o desenvolvedor)';
  }

  voltarPagina() {
    this.location.back();
  }

}
