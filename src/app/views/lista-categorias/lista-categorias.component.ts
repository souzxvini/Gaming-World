import { Categoria } from './../../model/categoria.model';
import { CategoriaService } from './../../service/game/categoria.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaFormDialogComponent } from '../categoria-form-dialog/categoria-form-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css']
})
export class ListaCategoriasComponent implements OnInit {

  categoriasList: Categoria[] = new Array<Categoria>()
  searchInputText = ""
  totalElements: number = 0
  pageSize: number = 12;
  page: number = 0;

  constructor(
    private categoriaService: CategoriaService,
    private dialog: MatDialog
  ) {
    this.buscarCategorias();
  }

  ngOnInit(): void {
  }

  buscarCategorias(){
    this.categoriaService.getCategorias().subscribe(data => {
      this.categoriasList = data.content
      this.totalElements = data.totalElements
    })
  }

  getCategoriasByString(e?: Event){

  }

  limparFiltro(){

  }

  adicionarCategoria(){
    const dialogRef = this.dialog.open(CategoriaFormDialogComponent, {
      width: '600px'
     });
     dialogRef.afterClosed().subscribe(result => {
      this.buscarCategorias()
     })
  }

  atualizarCategoria(id: any){

  }

  excluirCategoria(categoria: Categoria){
    Swal.fire({
      title: 'Are you sure you want to remove ' + categoria.nome +'?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.deleteCategoria(categoria.id).subscribe(() => {
            this.buscarCategorias()
          })
          }

           Swal.fire(
          'Deleted!',
          categoria.nome +' has been deleted.',
          'success'
        )
        })
      }

  onPaginateChange(event: PageEvent) {
    this.page = event.pageIndex
    this.pageSize = event.pageSize

  }

}
