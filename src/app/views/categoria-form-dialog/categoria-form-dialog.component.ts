import { CategoriaService } from './../../service/game/categoria.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria-form-dialog',
  templateUrl: './categoria-form-dialog.component.html',
  styleUrls: ['./categoria-form-dialog.component.css']
})
export class CategoriaFormDialogComponent implements OnInit {

  public form!: FormGroup
  private categoriaService!: CategoriaService

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CategoriaFormDialogComponent>
    ) {

    }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required]]
    });
  }

  cancel(): void{
    this.dialogRef.close();
    this.form.reset();
  }

  /*adicionarCategoria(){
      this.categoriaService.postCategoria(this.categoriaForm.value).subscribe(result => {
      this.dialogRef.close();
      this.categoriaForm.reset();
    })
  }*/


}
