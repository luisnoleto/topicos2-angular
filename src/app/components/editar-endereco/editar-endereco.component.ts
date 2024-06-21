import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnderecoService } from '../../services/endereco.service';
import { EnderecoDTO } from '../../models/enderecoDTO.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-editar-endereco',
  standalone: true,
  imports: [
    ReactiveFormsModule, // Mude de providers para imports
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './editar-endereco.component.html',
  styleUrls: ['./editar-endereco.component.css'],
})
export class EditarEnderecoComponent implements OnInit {
  formGroup: FormGroup;
  enderecoId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private enderecoService: EnderecoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.formGroup = this.formBuilder.group({
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      nomeCidade: ['', Validators.required],
      nomeEstado: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.enderecoId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.enderecoId) {
      this.enderecoService.getEnderecoById(this.enderecoId).subscribe({
        next: (endereco: EnderecoDTO) => {
          this.formGroup.patchValue(endereco);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Erro ao buscar endereço', error);
        },
      });
    }
  }

  onSubmit() {
    if (this.formGroup.valid && this.enderecoId !== null) {
      const endereco: EnderecoDTO = this.formGroup.value;
      const usuarioLogado = this.authService.getUsuarioLogadoSync();
      if (usuarioLogado) {
        this.enderecoService.update(endereco).subscribe({
          next: () => {
            this.router.navigateByUrl('/meus-enderecos');
          },
          error: (error: HttpErrorResponse) => {
            console.error('Erro ao atualizar endereço', error);
          },
        });
      }
    }
  }
  cancelar() {
    this.router.navigateByUrl('/usuarios/dados-usuario');
  }
}
