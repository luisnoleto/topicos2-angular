import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { UserStateService } from '../../services/userState.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-update-nome',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
  ],
  templateUrl: './update-nome.component.html',
  styleUrls: ['./update-nome.component.css'],
})
export class UpdateNomeComponent implements OnInit, OnDestroy {
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
      novoNome: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {
    this.obterUsuarioLogado();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  obterUsuarioLogado() {
    this.subscription.add(
      this.authService.getUsuarioLogado().subscribe((usuario) => {
        this.usuarioLogado = usuario;
      })
    );
  }

  updateNome() {
    if (this.formGroup.get('senhaAtual')?.valid) {
      const senhaAtual = this.formGroup.get('senhaAtual')!.value;
      const novoNome = this.formGroup.get('novoNome')!.value;

      this.userService.alterarNome(senhaAtual, novoNome).subscribe({
        next: (response) => {
          this.showSnackbarTopPosition('Nome Alterado com Sucesso', 'Fechar');
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

  voltarPagina() {
    
    this.location.back();
  }
}
