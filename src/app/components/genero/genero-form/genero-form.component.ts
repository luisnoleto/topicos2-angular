import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GeneroService } from '../../../services/genero.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Genero } from '../../../models/genero.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-genero-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule],
  templateUrl: './genero-form.component.html',
  styleUrl: './genero-form.component.css'
})
export class GeneroFormComponent {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private generoService: GeneroService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    const genero: Genero = activatedRoute.snapshot.data['genero'];

    this.formGroup = formBuilder.group({
      id: [(genero && genero.id) ? genero.id : null],
      nome: [(genero && genero.nome) ? genero.nome : '',Validators.compose([Validators.required])],    
    });
  }

  salvar() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const genero = this.formGroup.value;
      
      const operacao = genero.id == null 
      ? this.generoService.insert(genero) 
      : this.generoService.update(genero);

      operacao.subscribe({
        next: () => this.router.navigateByUrl('/generos'),
        error: (error: HttpErrorResponse) => {
          console.log('Erro ao Salvar' + JSON.stringify(error));
          this.tratarErros(error);
        },
      });
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const genero = this.formGroup.value;
      if (genero.id != null) {
        this.generoService.delete(genero).subscribe({
          next: () => {
            this.router.navigateByUrl('/generos');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
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

    errorMessages: { [controlName: string]: { [errorName: string]: string } } = {

    nome: {
      required: 'O nome deve ser informado.',
      minlength: 'O nome deve ter no mínimo 6 caracteres.',
      apiError: ' '
    },

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
