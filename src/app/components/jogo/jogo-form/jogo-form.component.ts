import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { JogoService } from '../../../services/jogo.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Jogo } from '../../../models/jogo.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Genero } from '../../../models/genero.model';
import { Plataforma } from '../../../models/plataforma.model';
import { Desenvolvedora } from '../../../models/desenvolvedora.model';
import { MatSelectModule } from '@angular/material/select';
import { GeneroService } from '../../../services/genero.service';
import { DesenvolvedoraService } from '../../../services/desenvolvedora.service';
import { PlataformaService } from '../../../services/plataforma.service';
import { Classificacao } from '../../../models/classificacao.model';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-jogo-form',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    RouterModule,
    MatSelectModule,
    CommonModule,
    MatIcon,
  ],
  templateUrl: './jogo-form.component.html',
  styleUrl: './jogo-form.component.css',
})
export class JogoFormComponent {
  formGroup: FormGroup;
  generos: Genero[] = [];
  plataformas: Plataforma[] = [];
  desenvolvedoras: Desenvolvedora[] = [];
  classificacoes: Classificacao[] = [];
  fileName: string = '';
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private jogoService: JogoService,
    private desenvolvedoraService: DesenvolvedoraService,
    private generoService: GeneroService,
    private plataformaService: PlataformaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const jogo: Jogo | null = activatedRoute.snapshot.data['jogo'];

    this.formGroup = formBuilder.group({
      id: [jogo?.id ?? null],
      nome: [
        jogo?.nome ?? '',
        Validators.compose([Validators.required, Validators.minLength(4)]),
      ],
      descricao: [
        jogo?.descricao ?? '',
        Validators.compose([Validators.required, Validators.minLength(4)]),
      ],
      preco: [jogo?.preco ?? '', Validators.compose([Validators.required])],
      estoque: [jogo?.estoque ?? '', Validators.required],
      processador: [jogo?.processador ?? '', Validators.required],
      memoria: [jogo?.memoria ?? '', Validators.required],
      placaVideo: [jogo?.placaVideo ?? '', Validators.required],
      sistemaOperacional: [jogo?.sistemaOperacional ?? '', Validators.required],
      armazenamento: [jogo?.armazenamento ?? '', Validators.required],
      genero: [jogo?.genero?.id ?? '', Validators.required],
      plataforma: [
        jogo?.plataforma?.id ?? null,
        Validators.compose([Validators.required]),
      ],
      desenvolvedora: [
        jogo?.desenvolvedora?.id ?? null,
        Validators.compose([Validators.required]),
      ],
      classificacao: [
        jogo?.classificacao ?? null,
        Validators.compose([Validators.required]),
      ],
      nomeImagem: [jogo?.nomeImagem ?? ''],
    });
  }

  ngOnInit(): void {
    this.generoService.findByAtivo(true).subscribe((data) => {
      this.generos = data;
    });

    this.plataformaService.findByAtivo(true).subscribe((data) => {
      this.plataformas = data;
    });

    this.desenvolvedoraService.findByAtivo(true).subscribe((data) => {
      this.desenvolvedoras = data;
    });
  }

  salvar() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const jogo = this.formGroup.value;

      // Debugging log
      console.log('Dados do jogo antes de salvar:', jogo);

      const operacao =
        jogo.id == null
          ? this.jogoService.save(jogo)
          : this.jogoService.update(jogo);
      this.carregarImagemSelecionada();
      operacao.subscribe({
        next: () => this.router.navigateByUrl('/admin/jogos'),
        error: (error: HttpErrorResponse) => {
          console.log('Erro ao Salvar', JSON.stringify(error));
          this.tratarErros(error);
        },
      });
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const jogo = this.formGroup.value;
      if (jogo.id != null) {
        this.jogoService.delete(jogo).subscribe({
          next: () => {
            this.router.navigateByUrl('/jogos');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          },
        });
      }
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
    nome: {
      required: 'O nome deve ser informado.',
      minlength: 'O nome deve conter ao menos 4 caracteres',
    },
    descricao: {
      required: 'A descrição deve ser informada.',
      minlength: 'A descrição deve conter ao menos 4 caracteres',
    },
    preco: {
      required: 'O preço deve ser informado.',
    },
    processador: {
      required: 'O processador deve ser informado.',
    },
    memoria: {
      required: 'A memória deve ser informada.',
    },
    placaVideo: {
      required: 'A placa de vídeo deve ser informada.',
    },
    sistemaOperacional: {
      required: 'O sistema operacional deve ser informado.',
    },
    armazenamento: {
      required: 'O armazenamento deve ser informado.',
    },
    genero: {
      required: 'O genero deve ser informado.',
    },
    plataforma: {
      required: 'A plataforma deve ser informada.',
    },
    desenvolvedora: {
      required: 'A desenvolvedora deve ser informada.',
    },
    classificacao: {
      required: 'A classificação deve ser informada.',
    },
    estoque: {
      required: 'O estoque deve ser informado.',
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
  carregarImagemSelecionada(event?: any) {
    this.selectedFile = event?.target.files[0];

    if (this.selectedFile) {
      this.fileName = this.selectedFile.name;
      this.formGroup.get('nomeImagem')?.setValue(this.fileName);

      const reader = new FileReader();
      reader.onload = (e) => (this.imagePreview = reader.result);
      reader.readAsDataURL(this.selectedFile);

      // Debugging log
      console.log('Imagem selecionada:', this.selectedFile.name);
      console.log(
        'FormGroup nomeImagem:',
        this.formGroup.get('nomeImagem')?.value
      );
      this.uploadImage(this.formGroup.get('id')?.value);
    }
  }

  private uploadImage(jogoId: number) {
    if (this.selectedFile) {
      this.jogoService
        .uploadImagem(jogoId, this.selectedFile.name, this.selectedFile)
        .subscribe({
          next: () => {
            console.log('Upload da imagem feito com sucesso');
          },
          error: () => {
            console.log('Erro ao fazer o upload da imagem');
          },
        });
    }
  }
}
