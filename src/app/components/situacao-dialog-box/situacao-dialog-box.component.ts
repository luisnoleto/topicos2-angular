import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-situacao-dialog-box',
  templateUrl: './situacao-dialog-box.component.html',
  styleUrls: ['./situacao-dialog-box.component.css'],
})
export class SituacaoDialogBoxComponent{
  constructor(
    public dialogRef: MatDialogRef<SituacaoDialogBoxComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  salvar() {
    this.dialogRef.close(true);
  }


  fechar(): void{
    this.dialogRef.close();
  }

}