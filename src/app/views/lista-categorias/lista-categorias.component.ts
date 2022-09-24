import { Categoria } from './../../model/categoria.model';
import { CategoriaService } from './../../service/game/categoria.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaFormDialogComponent } from '../categoria-form-dialog/categoria-form-dialog.component';
import Swal from 'sweetalert2';
import { CategoriaEditFormDialogComponent } from '../categoria-edit-form-dialog/categoria-edit-form-dialog.component';
import { GameService } from 'src/app/service/game/game.service';
import { Game } from 'src/app/model/game.model';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css']
})
export class ListaCategoriasComponent implements OnInit {

  categoriasList: Categoria[] = new Array<Categoria>()
  gamesList: Game[] = new Array<Game>()
  searchInputText = ""
  totalElements: number = 0
  pageSize: number = 12;
  page: number = 0;

  constructor(
    private categoriaService: CategoriaService,
    private gameService: GameService,
    private dialog: MatDialog
  ) {
    this.buscarCategorias();
    this.getGames();
  }

  ngOnInit(): void {
  }

  buscarCategorias(){
    this.categoriaService.getCategorias(this.page, this.pageSize).subscribe(data => {
      this.categoriasList = data.content
      this.totalElements = data.totalElements
    })
  }

  forEachTypedCharacter(e?: Event){
    this.page = 0
    const target = e.target as HTMLInputElement;
    const value = target.value

    this.searchCategoriesByString(value, this.page, this.pageSize);
  }

  limparFiltro(){
    this.searchInputText = ''
    this.page = 0

    this.searchCategoriesByString(this.searchInputText, this.page, this.pageSize);
  }

  searchCategoriesByString(string: string, page: number, pageSize: number ){
    this.categoriaService.getCategoriasByString(string , page, pageSize).subscribe(data => {
      this.categoriasList = data.content
      this.totalElements = data.totalElements
    })
  }

  adicionarCategoria(){
    const dialogRef = this.dialog.open(CategoriaFormDialogComponent, {
      width: '600px'
     });
     dialogRef.afterClosed().subscribe(result => {
      this.searchInputText = ''
      this.buscarCategorias()
     })
  }

  atualizarCategoria(id: any){
    const dialogRef = this.dialog.open(CategoriaEditFormDialogComponent, {
      width: '600px'
     });
     dialogRef.componentInstance.id = id;
     dialogRef.afterClosed().subscribe(result => {
       if(dialogRef.componentInstance.recarregarLista ){
           this.buscarCategorias()
         }
       })
     }

  excluirCategoria(categoria: Categoria){
    let listaDeJogos = new Array<Game>()
    listaDeJogos = this.gamesList.filter(a =>
      a.categoria.nome.indexOf(categoria.nome) >= 0).map(x => x)

    if(listaDeJogos.length > 0){
      Swal.fire({
        icon: 'error',
        title: "Oops...You can't delete it!",
        text: "There are some games assigned to " + categoria.nome +  "'s category!",
      })
    }
    else{
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
                Swal.fire(
                'Deleted!',
                categoria.nome +' has been deleted.',
                'success'
              )
            }
          }
        )
      }
    }

  getGames(){
    this.gameService.getGamesWithNoPagination().subscribe(data => {
      this.gamesList = data
    })
  }

  onPaginateChange(event: PageEvent) {
    this.page = event.pageIndex
    this.pageSize = event.pageSize

    this.searchCategoriesByString(this.searchInputText, this.page, this.pageSize);

  }

}
