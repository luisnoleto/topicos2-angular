import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RequisitoService } from '../../../services/requisito.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Requisito } from '../../../models/requisitos.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-requisito-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule, MatSelectModule ],
  templateUrl: './requisito-form.component.html',
  styleUrl: './requisito-form.component.css'
})
export class RequisitoFormComponent {

  formGroup: FormGroup;
  desempenhos: string[] = ['Baixo', 'Médio', 'Alto'];


  constructor(
    private formBuilder: FormBuilder,
    private RequisitoService: RequisitoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  this.formGroup = this.formBuilder.group({
    id: [null],
    processador: ['', Validators.compose([Validators.required])],
    memoria: ['', Validators.compose([Validators.required])],
    armazenamento: ['', Validators.compose([Validators.required])],
    placaVideo: ['', Validators.compose([Validators.required])],
    sistemaOperacional: ['', Validators.compose([Validators.required])],

  });
}
  
    initialieForm() {

    const requisito: Requisito = this.activatedRoute.snapshot.data['requisito'];


    this.formGroup = this.formBuilder.group({
      id: [(requisito && requisito.id) ? requisito.id : null],
      processador: [(requisito && requisito.processador) ? requisito.processador : '',Validators.compose([Validators.required])],
      memoria: [(requisito && requisito.memoria) ? requisito.memoria : '', Validators.compose([Validators.required])],
      armazenamento: [(requisito && requisito.armazenamento) ? requisito.armazenamento : '', Validators.compose([Validators.required])],
      placaVideo: [(requisito && requisito.placaVideo) ? requisito.placaVideo : '', Validators.compose([Validators.required])],
      sistemaOperacional: [(requisito && requisito.sistemaOperacional) ? requisito.sistemaOperacional : '', Validators.compose([Validators.required])],   
      desempenho: [(requisito && requisito.desempenho) ? requisito.desempenho : '', Validators.compose([Validators.required])] 
    });

  }

  salvar() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const requisito = this.formGroup.value;
      
      const operacao = requisito.id == null 
      ? this.RequisitoService.insert(requisito) 
      : this.RequisitoService.update(requisito);

      operacao.subscribe({
        next: () => this.router.navigateByUrl('/requisitos'),
        error: (error: HttpErrorResponse) => {
          console.log('Erro ao Salvar' + JSON.stringify(error));
          this.tratarErros(error);
        },
      });
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const requisito = this.formGroup.value;
      if (requisito.id != null) {
        this.RequisitoService.delete(requisito).subscribe({
          next: () => {
            this.router.navigateByUrl('/requisitos');
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

    processador: {
      required: 'O processador deve ser informado.',
    },
    memoria: {
      required: 'A memória deve ser informada.',
    },
    armazenamento: {
      required: 'O armazenamento deve ser informado.',
    },
    placaVideo: {
      required: 'A placa de vídeo deve ser informada.',
    },
    sistemaOperacional: {
      required: 'O sistema operacional deve ser informado.',
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
