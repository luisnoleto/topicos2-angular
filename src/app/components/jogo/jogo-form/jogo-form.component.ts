import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { JogoService } from '../../../services/jogo.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Jogo } from '../../../models/jogo.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Genero } from '../../../models/genero.model';
import { Plataforma } from '../../../models/plataforma.model';
import { Desenvolvedora } from '../../../models/desenvolvedora.model';
import { RequisitoService } from '../../../services/requisito.service';
import { MatSelectModule } from '@angular/material/select';
import { GeneroService } from '../../../services/genero.service';
import { Fabricante } from '../../../models/fabricante.model';
import { FabricanteService } from '../../../services/fabricante.service';
import { DesenvolvedoraService } from '../../../services/desenvolvedora.service';
import { PlataformaService } from '../../../services/plataforma.service';
import { Requisito } from '../../../models/requisitos.model';



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
    MatSelectModule
  ],
  templateUrl: './jogo-form.component.html',
  styleUrl: './jogo-form.component.css',
})
export class JogoFormComponent {
  formGroup: FormGroup;
  generos: Genero[] = [];
  plataformas: Plataforma[] = [];
  desenvolvedoras: Desenvolvedora[] = [];
  requisitos: Requisito[] = [];
  classificacoes: string[] = ['Livre', '10 anos', '12 anos', '14 anos', '16 anos', '18 anos'];



  constructor(
    private formBuilder: FormBuilder,
    private jogoService: JogoService,
    private requisitoService: RequisitoService,
    private desenvolvedoraService: DesenvolvedoraService,
    private generoService: GeneroService,
    private plataformaService: PlataformaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    this.formGroup = formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: ['', Validators.required],
      genero: [null],
      fabricante: [null],
      requisito: [null],

    });
  }
    ngOnInit(): void {
      this.generoService.findAll().subscribe(data => {
        this.generos = data;
        this.initializeForm();
      });

      this.plataformaService.findAll().subscribe(data => {
        this.plataformas = data;
        this.initializeForm();
      });

      this.desenvolvedoraService.findAll().subscribe(data => {
        this.desenvolvedoras = data;
        this.initializeForm();
      });

      this.requisitoService.findAll().subscribe(data => {
        this.requisitos = data;
        this.initializeForm();
      });



    }

    initializeForm() {
      const jogo: Jogo = this.activatedRoute.snapshot.data['jogo'];

      // selecionando o estado
      const genero = this.generos
        .find(genero => genero.id === (jogo?.genero?.id || null));

      const plataforma = this.plataformas
        .find(plataforma => plataforma.id === (jogo?.plataforma?.id || null));

      const desenvolvedora = this.desenvolvedoras
        .find(desenvolvedora => desenvolvedora.id === (jogo?.desenvolvedora?.id || null));
      
      const requisito = this.requisitos
        .find(requisito => requisito.id === (jogo?.requisitos?.id || null));
      

      this.formGroup = this.formBuilder.group({
        id: [jogo && jogo.id ? jogo.id : null],
        nome: [jogo && jogo.nome ? jogo.nome : '', Validators.required],
        descricao: [jogo && jogo.descricao ? jogo.descricao : '', Validators.required],
        preco: [jogo && jogo.preco ? jogo.preco : '', Validators.required],
        genero: [genero],
        plataforma: [plataforma],
        requisitos: [requisito],
        desenvolvedora: [desenvolvedora],
        classificacao: [jogo && jogo.classificacao ? jogo.classificacao : '', Validators.required],
      });
    }


    salvar() {
      this.formGroup.markAllAsTouched();
      if (this.formGroup.valid) {
        const jogo = this.formGroup.value;

        const operacao = jogo.id == null
          ? this.jogoService.insert(jogo)
          : this.jogoService.update(jogo);

        operacao.subscribe({
          next: () => this.router.navigateByUrl('/jogos'),
          error: (error: HttpErrorResponse) => {
            console.log('Erro ao Salvar' + JSON.stringify(error));
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


    tratarErros(error: HttpErrorResponse){
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
        };
      } else if (error.status < 400) {
        alert(error.error?.message || 'Erro generico no envio do formulario.');
      } else if (error.status >= 500) {
        alert('Erro interno do Servidor. Por favor, tente novamente mais tarde.');
      }
    }


    errorMessages: { [controlName: string]: { [errorName: string]: string } } = {

      nome: {
        required: 'O nome deve ser informado.',
          minlength: 'O nome deve conter ao menos 4 caracteres'
      },
      sigla: {
        required: 'A sigla deve ser informada.',
          minlength: 'A sigla deve possuir exatos 2 caracteres.',
            maxlength: 'A sigla deve possuir exatos 2 caracteres.',
              apiError: ''
      }
    }

    getErrorMessage(controlName: string, errors: ValidationErrors | null | undefined): string {
      if (!errors) {
        return '';
      }

      for (const errorName in errors) {
        if (errors.hasOwnProperty(errorName) && this.errorMessages[controlName][errorName]) {
          return this.errorMessages[controlName][errorName];
        }
      }
      return 'Erro não mapeado (entre em contato com o desenvolvedor)';
    }


  }

