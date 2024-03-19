import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Estado } from '../../../models/estado.model';
import { Municipio } from '../../../models/municipio.model';
import { EstadoService } from '../../../services/estado.service';
import { MunicipioService } from '../../../services/municipio.service';

@Component({
  selector: 'app-municipio-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, 
    RouterModule, MatSelectModule],
  templateUrl: './municipio-form.component.html',
  styleUrl: './municipio-form.component.css'
})
export class MunicipioFormComponent implements OnInit {

  formGroup: FormGroup;
  estados: Estado[] = [];

  constructor(private formBuilder: FormBuilder,
    private municipioService: MunicipioService,
    private estadoService: EstadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.formGroup = formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      estado: [null]
    });
  }
  ngOnInit(): void {
    this.estadoService.findAll().subscribe(data => {
      this.estados = data;
      this.initializeForm();
    });
  }

  initializeForm() {

    const municipio: Municipio = this.activatedRoute.snapshot.data['municipio'];

    // selecionando o estado
    const estado = this.estados
      .find(estado => estado.id === (municipio?.estado?.id || null)); 

    this.formGroup = this.formBuilder.group({
      id: [(municipio && municipio.id) ? municipio.id : null],
      nome: [(municipio && municipio.nome) ? municipio.nome : '', Validators.required],
      estado: [estado]
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const municipio = this.formGroup.value;
      if (municipio.id ==null) {
        this.municipioService.insert(municipio).subscribe({
          next: (municipioCadastrado) => {
            this.router.navigateByUrl('/municipios');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.municipioService.update(municipio).subscribe({
          next: (municipioAlterado) => {
            this.router.navigateByUrl('/municipios');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          }
        });
      }
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const municipio = this.formGroup.value;
      if (municipio.id != null) {
        this.municipioService.delete(municipio).subscribe({
          next: () => {
            this.router.navigateByUrl('/municipios');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

}
