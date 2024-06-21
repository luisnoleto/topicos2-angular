import { Component } from '@angular/core';
import {
  FormArray,
  FormArrayName,
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
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControlName } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
} from '@angular/material/core';

import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
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
    MatOption,
    MatSelectModule,
  ],
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.css',
})
export class CadastroUsuarioComponent {
  formGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const user: User = activatedRoute.snapshot.data['user'];

    this.formGroup = formBuilder.group({
      id: user && user.id ? user.id : null,
      nome: [user && user.nome ? user.nome : '', Validators.required],
      login: [user && user.login ? user.login : '', Validators.required],
      senha: [
        user && user.senha ? user.senha : '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      email: [user && user.email ? user.email : '', Validators.required],
      cpf: [user && user.cpf ? user.cpf : '', Validators.required],
      listaTelefone: this.formBuilder.array(
        user && user.listaTelefone
          ? user.listaTelefone.map((tel) => this.formBuilder.group(tel))
          : []
      ),
    });
  }

  get listaTelefone() {
    return this.formGroup.get('listaTelefone') as FormArray;
  }

  addTelefone() {
    this.listaTelefone.push(
      this.formBuilder.group({ codigoArea: '', numero: '' })
    );
  }

  removeTelefone() {
    if (this.listaTelefone.controls.length > 0) {
      this.listaTelefone.removeAt(this.listaTelefone.controls.length - 1);
    }
  }

  salvar() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const user = { ...this.formGroup.value };

      let operacao;

      operacao = this.userService.insert(user);
      console.log('Dados do usuário antes de salvar:', user);
      operacao.subscribe({
        next: () => this.router.navigateByUrl('/login'),
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
      const user = this.formGroup.value;
      if (user.id != null) {
        this.userService.delete(user).subscribe({
          next: () => {
            this.router.navigateByUrl('/usuarios');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          },
        });
      }
    }
  }
}
