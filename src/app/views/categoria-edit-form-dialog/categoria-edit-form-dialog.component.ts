import { CategoriaExistsValidationService } from './../../service/game/categoria-exists-validation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/categoria.model';
import { MatDialogRef } from '@angular/material/dialog';
import { GameService } from 'src/app/service/game/game.service';
import { CategoriaService } from 'src/app/service/game/categoria.service';
import { usuarioSenhaIguaisValidator } from '../game-form-dialog/usuario-senha-iguais.validator';
import { Game } from 'src/app/model/game.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-game-edit-form-dialog',
  templateUrl: './categoria-edit-form-dialog.component.html',
  styleUrls: ['./categoria-edit-form-dialog.component.css']
})
export class CategoriaEditFormDialogComponent implements OnInit {

  form: FormGroup
  id: number;
  categoria: Categoria = new Categoria();
  recarregarLista: boolean = true;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<CategoriaEditFormDialogComponent>,
    private categoriaService: CategoriaService,
    private categoriaExistsValidationService: CategoriaExistsValidationService) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [null, [Validators.required], [this.categoriaExistsValidationService.categoryExists(this.id)]]
    })
    this.buscarCategoria();
  }

  cancel(): void{
    this.recarregarLista = false
    this.dialogRef.close();
    this.form.reset();
  }

  buscarCategoria(){
    this.categoriaService.getCategoriaDetails(this.id).subscribe(data => {
      this.categoria = data;
      this.preencherForm();
    })
  }

  preencherForm(){
    this.form.get('nome').setValue(this.categoria.nome)
  }

  atualizarCategoria(){
    let categoria = new Categoria();

    categoria.id = this.categoria.id
    categoria.nome = this.form.get('nome').value

    Swal.fire({
      title: 'Are you sure you want to update this category name?',
      text: "You'll be able do change it again.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, udpate it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.updateCategoria(categoria).subscribe(() => {
          this.recarregarLista = true
          this.dialogRef.close();
          Swal.fire(
            'Updated!',
            'The category name has been updated.',
            'success'
          )
        },(error) => {
          alert(error)
        })

      }
    })
  }
}
