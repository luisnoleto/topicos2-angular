import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
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
  ],
  templateUrl: './jogo-form.component.html',
  styleUrl: './jogo-form.component.css',
})
export class JogoFormComponent {
  formGroup: FormGroup;
  generos: Genero[] = [];
  plataformas: Plataforma[] = [];
  desenvolvedoras: Desenvolvedora[] = [];
  classificacoes: string[] = ['Livre', '10 anos', '12 anos', '14 anos', '16 anos', '18 anos'];

  constructor(
    private formBuilder: FormBuilder,
    private jogoService: JogoService,
    private desenvolvedoraService: DesenvolvedoraService,
    private generoService: GeneroService,
    private plataformaService: PlataformaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    
    const jogo: Jogo = activatedRoute.snapshot.data['jogo'];

    this.formGroup = formBuilder.group({
      id: [jogo && jogo.id ? jogo.id : null],
      nome: [jogo && jogo.nome ? jogo.nome : '', Validators.required],
      descricao: [jogo && jogo.descricao ? jogo.descricao : '', Validators.required],
      preco: [jogo && jogo.preco ? jogo.preco : '', Validators.required],
      genero: [Genero],
      plataforma: [jogo && jogo.plataforma ? jogo.plataforma : '', Validators.required],
      requisitos: [jogo && jogo.requisitos ? jogo.requisitos : '', Validators.required],
      desenvolvedora: [jogo && jogo.desenvolvedora ? jogo.desenvolvedora : '', Validators.required],
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
    if(error.status == 400){
      if(error.error?.errors){
        error.error.errors.forEach((validationError: any) => {
          const formControl = this.formGroup.get(validationError.field);
          console.log(validationError);
          if(formControl){
            console.log(formControl);
            formControl.setErrors({ apiError: validationError.message});
          }
        });
      };
    } else if(error.status < 400) {
      alert(error.error?.message || 'Erro generico no envio do formulario.');
    } else if(error.status >= 500){
      alert('Erro interno do Servidor. Por favor, tente novamente mais tarde.');
    }
  }


} 

