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
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControlName } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { PerfilDTO } from '../../../models/perfildto.model';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-user-form',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
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
    MatSelectModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  formGroup: FormGroup;
  perfis: PerfilDTO[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const user: User = activatedRoute.snapshot.data['user'];
    this.loadPerfis();
    this.formGroup = formBuilder.group({
      id: user && user.id ? user.id : null,
      nome: [user && user.nome ? user.nome : '', Validators.required],
      login: [user && user.login ? user.login : '', Validators.required],
      email: [user && user.email ? user.email : '', Validators.required],
      cpf: [user && user.cpf ? user.cpf : '', Validators.required],
      dataNascimento: [
        user && user.dataNascimento ? user.dataNascimento : '',
        Validators.required,
      ],
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
      const user = this.formGroup.value;
      console.log(user.lista);

      const operacao =
        user.id == null
          ? this.userService.insert(user)
          : this.userService.update(user);

      operacao.subscribe({
        next: () => this.router.navigateByUrl('/admin/usuarios'),
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
  loadPerfis() {
    this.userService.findAllPerfis().subscribe((data) => {
      this.perfis = data;
    });
  }
}
