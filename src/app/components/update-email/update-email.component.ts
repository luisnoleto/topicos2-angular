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
import { Location } from '@angular/common';
import { UserStateService } from '../../services/userState.service';

@Component({
  selector: 'app-update-nome',
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
  templateUrl: './update-email.component.html',
  styleUrl: './update-email.component.css',
})
export class UpdateEmailComponent implements OnInit, OnDestroy {
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
    private snackbar: MatSnackBar,
    private location: Location,
    private userStateService: UserStateService
  ) {
    const user: User = activatedRoute.snapshot.data['user'];
    this.formGroup = formBuilder.group({
      id: user && user.id ? user.id : null,
      senhaAtual: [
        user && user.senha ? user.senha : '',
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      novoEmail: ['', [Validators.required, Validators.minLength(4), Validators.email]],
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.obterUsuarioLogado();
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

  updateEmail() {
    if (this.formGroup.get('senhaAtual')?.valid) {
      const senhaAtual = this.formGroup.get('senhaAtual')!.value;
      const novoEmail = this.formGroup.get('novoEmail')!.value;

      this.userService.alterarEmail(senhaAtual, novoEmail).subscribe({
        next: (response) => {
          console.log('Email updated successfully', response);
          this.showSnackbarTopPosition('Email Alterada com Sucesso', 'Fechar');
          this.userStateService.updateUser(response);
          this.voltarPagina();
        },
        error: (error) => {
          console.error('Error updating Email', error);
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

  voltarPagina() {
    this.location.back();
  }
}
