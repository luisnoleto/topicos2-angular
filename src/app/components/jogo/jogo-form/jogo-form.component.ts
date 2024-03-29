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

  constructor(
    private formBuilder: FormBuilder,
    private jogoService: JogoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const jogo: Jogo = activatedRoute.snapshot.data['jogo'];

    this.formGroup = formBuilder.group({
      id: [jogo && jogo.id ? jogo.id : null],
      nome: [jogo && jogo.nome ? jogo.nome : '', Validators.required],
      descricao: [jogo && jogo.descricao ? jogo.descricao : '', Validators.required],
      preco: [jogo && jogo.preco ? jogo.preco : '', Validators.required],
      genero: [jogo && jogo.genero ? jogo.genero : '', Validators.required],
      plataforma: [jogo && jogo.plataforma ? jogo.plataforma : '', Validators.required],
      requisitos: [jogo && jogo.requisitos ? jogo.requisitos : '', Validators.required],
      desenvolvedora: [jogo && jogo.desenvolvedora ? jogo.desenvolvedora : '', Validators.required],
      classificacao: [jogo && jogo.classificacao ? jogo.classificacao : '', Validators.required],      
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const jogo = this.formGroup.value;
      if (jogo.id == null) {
        this.jogoService.insert(jogo).subscribe({
          next: (jogoCadastrado) => {
            this.router.navigateByUrl('/jogos');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          },
        });
      } else {
        this.jogoService.update(jogo).subscribe({
          next: (jogoAlterado) => {
            this.router.navigateByUrl('/jogos');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          },
        });
      }
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
}
