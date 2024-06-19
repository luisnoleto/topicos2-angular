import { Component, ViewChild, OnInit } from '@angular/core';
import { CarouselComponent } from '../carousel.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselService } from '../../../services/carousel.service';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Jogo {
  id: string;
  nome: string;
}

@Component({
  selector: 'app-carousel-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CarouselComponent,
    MatOption,
    MatSelectModule,
  ],
  templateUrl: './carousel-form.component.html',
  styleUrls: ['./carousel-form.component.css'],
})
export class CarouselFormComponent implements OnInit {
  @ViewChild(CarouselComponent) carouselComponent!: CarouselComponent;
  formGroup: FormGroup;
  deleteFormGroup: FormGroup;
  selectedFile: any = null;
  jogos: Jogo[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private carouselService: CarouselService,
    private snackBar: MatSnackBar
  ) {
    this.formGroup = this.formBuilder.group({
      jogoId: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
    this.deleteFormGroup = this.formBuilder.group({
      jogoId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadJogos();
  }

  loadJogos(): void {
    this.carouselService.getJogos().subscribe((jogos) => {
      this.jogos = jogos;
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.formGroup.patchValue({ image: this.selectedFile.name });
    }
  }

  onSubmit() {
    if (this.formGroup.invalid || !this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('jogoId', this.formGroup.value.jogoId);
    formData.append('nomeImagemCarousel', this.selectedFile.name);
    formData.append('imagemCarousel', this.selectedFile);

    this.carouselService.addSlide(formData).subscribe(
      (newSlide) => {
        console.log('Slide added:', newSlide);
        //refresh this page

        location.reload();
      },
      (error) => {
        console.error('Error adding slide:', error);
        // Handle error, show error message to user
      }
    );
  }
  onDelete(): void {
    if (this.deleteFormGroup.invalid) {
      return;
    }

    const jogoId = this.deleteFormGroup.value.jogoId;
    this.carouselService.removeSlideByJogoId(jogoId).subscribe(
      () => {
        console.log('Slide removed for jogoId:', jogoId);
        location.reload();
      },
      (error: any) => {
        this.showSnackbarTopPosition('Esse jogo não possui Slides!', 'Fechar');
        console.error('Error removing slide:', error);
      }
    );
  }
  showSnackbarTopPosition(content: any, action: any) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
