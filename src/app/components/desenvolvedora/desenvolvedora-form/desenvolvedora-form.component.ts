import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Desenvolvedora } from '../../../models/desenvolvedora.model';
import { DesenvolvedoraService } from '../../../services/desenvolvedora.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Pais } from '../../../models/pais.model';
import { PaisService } from '../../../services/pais.service';

@Component({
  selector: 'app-desenvolvedora-form',
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
  templateUrl: './desenvolvedora-form.component.html',
  styleUrl: './desenvolvedora-form.component.css',
})
export class DesenvolvedoraFormComponent {
  formGroup: FormGroup;
  paises: Pais[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private desenvolvedoraService: DesenvolvedoraService,
    private paisService: PaisService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const desenvolvedora: Desenvolvedora =
      activatedRoute.snapshot.data['desenvolvedora'];

    this.formGroup = formBuilder.group({
      id: [(desenvolvedora && desenvolvedora.id) ? desenvolvedora.id : null],
      nome: [
        (desenvolvedora && desenvolvedora.nome) ? desenvolvedora.nome : '',
        Validators.compose([Validators.required, Validators.minLength(4)])
      ],
      cnpj: [
        desenvolvedora && desenvolvedora.cnpj ? desenvolvedora.cnpj : '',
        Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
      ],
      pais: [
        desenvolvedora && desenvolvedora.pais ? desenvolvedora.pais.id : null,
        Validators.compose([Validators.required])
      ],
    });
  }
  ngOnInit(): void {
    this.paisService.findAll().subscribe((data) => {
      this.paises = data;
    });
  }

  salvar() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const desenvolvedora = this.formGroup.value;

      const operacao =
        desenvolvedora.id == null
          ? this.desenvolvedoraService.insert(desenvolvedora)
          : this.desenvolvedoraService.update(desenvolvedora);

      operacao.subscribe({
        next: () => this.router.navigateByUrl('/desenvolvedoras'),
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
      alert(error.error?.message || 'Erro genérico no envio do formulário.');
    } else if (error.status >= 500) {
      alert('Erro interno do servidor. Por favor, tente novamente mais tarde.');
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const desenvolvedora = this.formGroup.value;
      if (desenvolvedora.id != null) {
        this.desenvolvedoraService.delete(desenvolvedora).subscribe({
          next: () => {
            this.router.navigateByUrl('/desenvolvedoras');
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
      minlength: 'O nome deve conter ao menos 4 caracteres'
    },
    cnpj: {
      required: 'O CNPJ deve ser informado.',
      minlength: 'O CNPJ deve possuir exatos 14 caracteres.',
      maxlength: 'O CNPJ deve possuir exatos 14 caracteres.',
      apiError: ''
    },
    pais: {
      required: 'O país deve ser informado.',
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
}
