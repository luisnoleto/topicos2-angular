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
  templateUrl: './update-login.component.html',
  styleUrl: './update-login.component.css',
})
export class UpdateLoginComponent implements OnInit, OnDestroy {
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
    this.formGroup = this.formBuilder.group({
      id: user && user.id ? user.id : null,
      senhaAtual: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      novoLogin: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.obterUsuarioLogado();
  }

  updateLogin() {
    if (this.formGroup.get('senhaAtual')?.valid) {
      const senhaAtual = this.formGroup.get('senhaAtual')!.value;
      const novoLogin = this.formGroup.get('novoLogin')!.value;

      this.userService.alterarLogin(senhaAtual, novoLogin).subscribe({
        next: (response) => {
          console.log('Login updated successfully', response);
          this.showSnackbarTopPosition('Login Alterada com Sucesso', 'Fechar');
          this.userStateService.updateUser(response);
          this.voltarPagina();
        },
        error: (error) => {
          console.error('Error updating Nome', error);
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
      this.authService.getUsuarioLogado().subscribe((usuario) => {
        this.usuarioLogado = usuario;
      })
    );
  }

  voltarPagina() {
    this.location.back();
  }
}
