import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
  ValidationErrors,
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
import { OnInit } from '@angular/core';
import { Endereco } from '../../models/endereco.model';

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
    MatSelectModule,
    MatSelect,
  ],
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css'],
})
export class CadastroEnderecoFormComponent implements OnInit {
  formGroup: FormGroup;
  municipios: Municipio[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private enderecoService: EnderecoService,
    private municipioService: MunicipioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const endereco: Endereco = activatedRoute.snapshot.data['endereco'];

    this.formGroup = this.formBuilder.group({
      id: [endereco?.id ?? null],
      cep: [endereco?.cep ??  '', Validators.required],
      logradouro: [endereco?.logradouro ??  '', Validators.required],
      numero: [endereco?.numero ??   '', Validators.required],
      complemento: [endereco?.complemento ?? ''],
      bairro: [endereco?.bairro ?? '', Validators.required],
      idCidade: [endereco?.cidade?.id ?? null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.municipioService.findAll().subscribe((municipios) => {
      this.municipios = municipios;
    });
  }

  salvar() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const endereco = this.formGroup.value;

      // Debugging log
      console.log('Dados do jogo antes de salvar:', endereco);

      const operacao =
        endereco.id == null
          ? this.enderecoService.save(endereco)
          : this.enderecoService.update(endereco);
     
      operacao.subscribe({
        next: () => this.router.navigateByUrl('/admin/jogos'),
        error: (error: HttpErrorResponse) => {
          console.log('Erro ao Salvar', JSON.stringify(error));
          this.tratarErros(error);
        },
      });
    }
  }

  tratarErros(error: HttpErrorResponse) {
    if (error.status == 400) {
      if (error.error?.errors) {
        error.error.errors.forEach((validationError: any) => {
          const formControl = this.formGroup.get(validationError.field);
          console.log(validationError);
          if (formControl) {
            console.log(formControl);
            formControl.setErrors({ apiError: validationError.message });
          }
        });
      }
    } else if (error.status < 400) {
      alert(error.error?.message || 'Erro generico no envio do formulario.');
    } else if (error.status >= 500) {
      alert('Erro interno do Servidor. Por favor, tente novamente mais tarde.');
    }
  }

  errorMessages: { [controlName: string]: { [errorName: string]: string } } = {
    cep: {
      required: 'O campo CEP é obrigatório',
    },
    logradouro: {
      required: 'O campo Logradouro é obrigatório',
    },
    numero: {
      required: 'O campo Número é obrigatório',
    },
    bairro: {
      required: 'O campo Bairro é obrigatório',
    },
    cidade: {
      required: 'O campo Cidade é obrigatório',
    },

    
  };

  getErrorMessage(
    controlName: string,
    errors: ValidationErrors | null | undefined
  ): string {
    if (!errors) {
      return '';
    }

    for (const errorName in errors) {
      if (
        errors.hasOwnProperty(errorName) &&
        this.errorMessages[controlName][errorName]
      ) {
        return this.errorMessages[controlName][errorName];
      }
    }
    return 'Erro não mapeado (entre em contato com o desenvolvedor)';
  }
}
