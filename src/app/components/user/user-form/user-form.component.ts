import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
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
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      email: [user && user.email ? user.email : '', Validators.required],
      cpf: [user && user.cpf ? user.cpf : '', Validators.required],
      telefones: formBuilder.array(
        user && user.telefones
          ? user.telefones.map((telefone) =>
              formBuilder.group({
                ddd: [telefone.codigoArea, Validators.required],
                numero: [telefone.numero, Validators.required],
              })
            )
          : []
      ),
    });
  }
  salvar() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const user = this.formGroup.value;

      const operacao =
        user.id == null
          ? this.userService.insert(user)
          : this.userService.update(user);

      operacao.subscribe({
        next: () => this.router.navigateByUrl('/usuarios'),
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
