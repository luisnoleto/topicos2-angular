import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Subscription } from 'rxjs';
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
import { HttpErrorResponse } from '@angular/common/http';
import { FormControlName } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-dados-usuario',
  standalone: true,
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
    MatNativeDateModule,
  ],
  templateUrl: './dados-usuario.component.html',
  styleUrl: './dados-usuario.component.css',
})
export class DadosUsuarioComponent implements OnInit {
  formGroup: FormGroup;
  showAddresses = false;
  usuarioLogado: User | null = null;
  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    const user: User = activatedRoute.snapshot.data['user'];
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
  ngOnInit(): void {
    this.obterUsuarioLogado();
  }
  obterUsuarioLogado() {
    this.subscription.add(
      this.authService
        .getUsuarioLogado()
        .subscribe((usuario) => (this.usuarioLogado = usuario))
    );
  }
  toggleAddresses() {
    this.showAddresses = !this.showAddresses;
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
        next: () => {
          location.reload();
        },
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
      console.log('Erro inesperado');
    }
  }
}
