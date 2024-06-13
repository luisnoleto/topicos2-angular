import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
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
import { MatSelectModule } from '@angular/material/select';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-senha',
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
  templateUrl: './update-senha.component.html',
  styleUrl: './update-senha.component.css',
})
export class UpdateSenhaComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  usuarioLogado: User | null = null;
  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private snackbar: MatSnackBar
  ) {
    const user: User = activatedRoute.snapshot.data['user'];
    this.formGroup = formBuilder.group({
      id: user && user.id ? user.id : null,
      senhaAtual: [
        user && user.senha ? user.senha : '',
        Validators.compose([Validators.required]),
      ],
      novaSenha: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.obterUsuarioLogado();
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

  updateSenha() {
    if (this.formGroup.get('senhaAtual')?.valid) {
      const senhaAtual = this.formGroup.get('senhaAtual')!.value;
      const novaSenha = this.formGroup.get('novaSenha')!.value;

      this.userService.alterarSenha(senhaAtual, novaSenha).subscribe({
        next: (response) => {
          console.log('Password updated successfully', response);
          this.showSnackbarTopPosition('Senha Alterada com Sucesso', 'Fechar');
        },
        error: (error) => {
          console.error('Error updating password', error);
          this.showSnackbarTopPosition('Senha atual não confere', 'Fechar');
        },
      });
    }
  }
  showSnackbarTopPosition(content: any, action: any) {
    this.snackbar.open(content, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
  
  obterUsuarioLogado() {
    this.subscription.add(
      this.authService
        .getUsuarioLogado()
        .subscribe((usuario) => (this.usuarioLogado = usuario))
    );
  }
}
