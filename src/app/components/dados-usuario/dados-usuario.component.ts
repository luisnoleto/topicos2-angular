import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserStateService } from '../../services/userState.service';
import { EnderecoService } from '../../services/endereco.service';
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
import { EnderecoResponseDTO } from '../../models/enderecoDTO.model';
import { EnderecoService } from '../../services/endereco.service';


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
  formTelefone: FormGroup;
  showAddresses = false;
  usuarioLogado: User | null = null;
  enderecos: EnderecoResponseDTO[] = [];
  private subscription = new Subscription();
  senhaAtual: string = '';
  showSenhaAtualField = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private userStateService: UserStateService,
    private enderecoService: EnderecoService
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
    });

    this.formTelefone = this.formBuilder.group({
      listaTelefone: this.formBuilder.array([]),
      senhaAtual: [''],
    });
  }

  ngOnInit(): void {
    this.obterUsuarioLogado();
    this.subscription.add(
      this.userStateService.user$.subscribe((user) => {
        if (user) {
          this.formGroup.patchValue(user);
          this.usuarioLogado = user;
          this.senhaAtual = user.senha || '';
        }
      })
    );
    this.loadEnderecos();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  obterUsuarioLogado() {
    this.subscription.add(
      this.authService.getUsuarioLogado().subscribe((usuario) => {
        if (usuario) {
          this.usuarioLogado = usuario;
          this.senhaAtual = usuario.senha || '';

          this.formGroup.patchValue({
            id: usuario.id,
            nome: usuario.nome,
            login: usuario.login,
            email: usuario.email,
            cpf: usuario.cpf,
            dataNascimento: usuario.dataNascimento,
            senha: usuario.senha,
          });

          const telefoneArray = this.formBuilder.array(
            usuario.listaTelefone?.map((tel) =>
              this.formBuilder.group({
                codigoArea: [tel.codigoArea, Validators.required],
                numero: [tel.numero, Validators.required],
              })
            ) || []
          );
          this.formTelefone.setControl('listaTelefone', telefoneArray);
        }
      })
    );
  }

  toggleAddresses() {
    this.showAddresses = !this.showAddresses;
  }

  loadEnderecos() {
    this.subscription.add(
      this.enderecoService.getEnderecos().subscribe((enderecos) => {
        this.enderecos = enderecos;
      })
    );
  }

  get listaTelefone() {
    return this.formTelefone.get('listaTelefone') as FormArray;
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

  showSenhaField() {
    this.showSenhaAtualField = true;
  }

  salvarTelefones() {
    if (this.formTelefone.valid) {
      if (!this.formTelefone.value.senhaAtual) {
        console.error('Senha atual não encontrada.');
        return;
      }

      const telefones = this.formTelefone.value.listaTelefone.map(
        (tel: any) => ({
          codigoArea: tel.codigoArea,
          numero: tel.numero,
        })
      );
      this.userService
        .alterarTelefone(this.formTelefone.value.senhaAtual, telefones)
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/usuarios/dados-usuario');
            console.log('Telefones salvos com sucesso');
            console.log(telefones);
          },
          error: (error: HttpErrorResponse) => {
            console.log('Erro ao salvar telefones' + JSON.stringify(error));
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

  irPedidos() {
    this.router.navigateByUrl('/meus-pedidos');
  }

  irEndereco() {
    this.router.navigateByUrl('/cadastro-enderecos');
  }

  carregarEnderecos() {
    this.enderecoService.getEnderecos().subscribe({
      next: (enderecos: EnderecoResponseDTO[]) => {
        this.enderecos = enderecos;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erro ao buscar endereços', error);
      },
    });
  }

  deletarEndereco(enderecoId: number) {
    const usuarioLogado = this.authService.getUsuarioLogadoSync();

    this.enderecoService.deletar(enderecoId).subscribe({
      next: () => {
        this.carregarEnderecos();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erro ao deletar endereço', error);
      },
    });
  }
}
