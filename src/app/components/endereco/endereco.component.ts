import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { EnderecoService } from '../../services/endereco.service';
import { EnderecoDTO } from '../../models/enderecoDTO.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MunicipioService } from '../../services/municipio.service';
import { Municipio } from '../../models/municipio.model';
import { MatSelect, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-cadastro-endereco-form',
  standalone: true,
  imports: [
    NgIf,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    CommonModule,
    MatSelectModule
  ],
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css'],
})
export class CadastroEnderecoFormComponent {
  formGroup: FormGroup;
  municipios: Municipio[] = []; 

  constructor(
    private formBuilder: FormBuilder,
    private enderecoService: EnderecoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const endereco: EnderecoDTO = activatedRoute.snapshot.data['endereco'];

    this.formGroup = formBuilder.group({
      id: endereco && endereco.id ? endereco.id : null,
      cep: [endereco && endereco.cep ? endereco.cep : '', Validators.required],
      logradouro: [
        endereco && endereco.logradouro ? endereco.logradouro : '',
        Validators.required,
      ],
      numero: [
        endereco && endereco.numero ? endereco.numero : '',
        Validators.required,
      ],
      complemento: [
        endereco && endereco.complemento ? endereco.complemento : '',
      ],
      bairro: [
        endereco && endereco.bairro ? endereco.bairro : '',
        Validators.required,
      ],
      idCidade: [
        endereco && endereco.idCidade ? endereco.idCidade : null,
        Validators.required,
      ],
    });
  }

  ngOnInit(): void {}

  salvar() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const endereco = { ...this.formGroup.value };

      let operacao;
      if (endereco.id) {
        operacao = this.enderecoService.insertEndereco(endereco);
      }

      operacao?.subscribe({
        next: () => this.router.navigateByUrl('/finalizar-pedido'),
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
    } else if (error.status < 400) {
      alert(error.error?.message || 'Erro não tratado.');
    } else if (error.status >= 500) {
      alert('Erro interno.');
    }
  }
}
