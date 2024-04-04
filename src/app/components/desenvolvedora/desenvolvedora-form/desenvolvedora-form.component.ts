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
      id: desenvolvedora && desenvolvedora.id ? desenvolvedora.id : null,
      nome: [
        desenvolvedora && desenvolvedora.nome ? desenvolvedora.nome : '',
        Validators.required,
      ],
      cnpj: [
        desenvolvedora && desenvolvedora.cnpj ? desenvolvedora.cnpj : '',
        Validators.required,
      ],
      pais: [
        desenvolvedora && desenvolvedora.pais ? desenvolvedora.pais.id : null,
        Validators.required,
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
      console.log(desenvolvedora.lista);

      const operacao =
        desenvolvedora.id == null
          ? this.desenvolvedoraService.insert(desenvolvedora)
          : this.desenvolvedoraService.update(desenvolvedora);

      operacao.subscribe({
        next: () => this.router.navigateByUrl('/dev-pais'),
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
      const desenvolvedora = this.formGroup.value;
      if (desenvolvedora.id != null) {
        this.desenvolvedoraService.delete(desenvolvedora).subscribe({
          next: () => {
            this.router.navigateByUrl('/dev-pais');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          },
        });
      }
    }
  }
}
