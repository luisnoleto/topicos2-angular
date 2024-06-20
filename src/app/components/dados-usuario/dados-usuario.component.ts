import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserStateService } from '../../services/userState.service';
import { User } from '../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-dados-usuario',
  standalone: true,
  imports: [
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
  styleUrls: ['./dados-usuario.component.css'],
})
export class DadosUsuarioComponent implements OnInit, OnDestroy {
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
    private activatedRoute: ActivatedRoute,
    private userStateService: UserStateService
  ) {
    const user: User = activatedRoute.snapshot.data['user'];
    this.formGroup = this.formBuilder.group({
      id: [user?.id || null],
      nome: [user?.nome || '', Validators.required],
      login: [user?.login || '', Validators.required],
      email: [user?.email || '', Validators.required],
      cpf: [user?.cpf || '', Validators.required],
      dataNascimento: [user?.dataNascimento || '', Validators.required],
      senha: ['', Validators.required],
      listaTelefone: this.formBuilder.array(
        user?.listaTelefone ? user.listaTelefone.map((tel) => this.formBuilder.group(tel)) : []
      ),
    });
  }

  ngOnInit(): void {
    this.obterUsuarioLogado();

    this.subscription.add(
      this.userStateService.user$.subscribe((user) => {
        if (user) {
          this.formGroup.patchValue(user);
          this.usuarioLogado = user;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  obterUsuarioLogado() {
    this.subscription.add(
      this.authService.getUsuarioLogado().subscribe((usuario) => {
        this.usuarioLogado = usuario;
        this.formGroup.patchValue({
          id: usuario?.id,
          nome: usuario?.nome,
          login: usuario?.login,
          email: usuario?.email,
          cpf: usuario?.cpf,
          dataNascimento: usuario?.dataNascimento,
          senha: usuario?.senha,
          listaTelefone: usuario?.listaTelefone || [],
        });
      })
    );
  }

  toggleAddresses() {
    this.showAddresses = !this.showAddresses;
  }

  get listaTelefone() {
    return this.formGroup.get('listaTelefone') as FormArray;
  }

  addTelefone() {
    this.listaTelefone.push(this.formBuilder.group({ codigoArea: '', numero: '' }));
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

      if (!user.id && this.usuarioLogado?.id) {
        user.id = this.usuarioLogado.id;
      }

      if (this.usuarioLogado?.senha) {
        user.senha = this.usuarioLogado.senha;
      }

      this.userService.update(user).subscribe({
        next: () => {
          this.router.navigateByUrl('/usuarios/dados-usuario');
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
          if (formControl) {
            formControl.setErrors({ apiError: validationError.message });
          }
        });
      }
    } else {
      console.log('Erro inesperado', error);
    }
  }
}
