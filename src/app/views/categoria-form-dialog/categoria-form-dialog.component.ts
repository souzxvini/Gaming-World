import { Categoria } from './../../model/categoria.model';
import { CategoriaService } from './../../service/game/categoria.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CategoriaExistsValidationService } from 'src/app/service/game/categoria-exists-validation.service';

@Component({
  selector: 'app-categoria-form-dialog',
  templateUrl: './categoria-form-dialog.component.html',
  styleUrls: ['./categoria-form-dialog.component.css']
})
export class CategoriaFormDialogComponent implements OnInit {

  public form!: FormGroup


  constructor(private categoriaService: CategoriaService,
    private categoryExistsValidationService: CategoriaExistsValidationService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CategoriaFormDialogComponent>
    ) {

    }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [null, [Validators.required], [this.categoryExistsValidationService.categoryExists()] ]
    });
  }

  cancel(): void{
    this.dialogRef.close();
    this.form.reset();
  }

  adicionarCategoria(){
      let categoria = new Categoria();
      categoria.nome = this.form.get('nome').value

      this.categoriaService.postCategoria(categoria).subscribe(() => {
        this.dialogRef.close();
        this.form.reset();

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Category "' + categoria.nome + '" added successfully!'
        })
      });
  }


}
