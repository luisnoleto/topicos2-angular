import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Fabricante } from '../../../models/fabricante.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FabricanteService } from '../../../services/fabricante.service';

@Component({
  selector: 'app-fabricante-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule],
  templateUrl: './fabricante-form.component.html',
  styleUrl: './fabricante-form.component.css'
})
export class FabricanteFormComponent {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private fabricanteService: FabricanteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    const fabricante: Fabricante = activatedRoute.snapshot.data['fabricante'];

    this.formGroup = formBuilder.group({
      id: [(fabricante && fabricante.id) ? fabricante.id : null],
      nome: [(fabricante && fabricante.nome) ? fabricante.nome : '',
      Validators.compose([Validators.required,
      Validators.minLength(4)])], 
    });
  }

  salvar() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const fabricante = this.formGroup.value;
      
      const operacao = fabricante.id == null 
      ? this.fabricanteService.insert(fabricante) 
      : this.fabricanteService.update(fabricante);

      operacao.subscribe({
        next: () => this.router.navigateByUrl('/fabricantes'),
        error: (error: HttpErrorResponse) => {
          console.log('Erro ao Salvar' + JSON.stringify(error));
          this.tratarErros(error);
        },
      });
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const fabricante = this.formGroup.value;
      if (fabricante.id != null) {
        this.fabricanteService.delete(fabricante).subscribe({
          next: () => {
            this.router.navigateByUrl('/fabricantes');
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
          const formControl = this.formGroup.get(validationError.fieldName);
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
      minlength: 'O nome deve ter no mínimo 4 caracteres.',
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
