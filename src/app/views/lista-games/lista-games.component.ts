import { GameDetailsDialogComponent } from './../game-details-dialog/game-details-dialog.component';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { CategoriaService } from './../../service/game/categoria.service';
import { GameEditFormDialogComponent } from './../game-edit-form-dialog/game-edit-form-dialog.component';
import { GameFormDialogComponent } from './../game-form-dialog/game-form-dialog.component';
import { Game } from './../../model/game.model';
import { GameService } from './../../service/game/game.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';
import { Categoria } from 'src/app/model/categoria.model';

@Component({
  selector: 'app-lista-games',
  templateUrl: './lista-games.component.html',
  styleUrls: ['./lista-games.component.css']
})
export class ListaGamesComponent implements OnInit {

  gamesList: Game[] = new Array<Game>();
  categoriasList: Categoria[] = new Array<Categoria>();
  totalElements: number = 0
  pageSize: number = 12;
  page: number = 0;
  selected = 'ALL'
  categoriaSelecionada: string;
  filtro: string
  searchInputText = ""

  constructor(private gameService: GameService,
    private categoriaService: CategoriaService,
    private dialog: MatDialog) {

   }

  ngOnInit(): void {
    this.getGames();
    this.getCategories();
  }

  getGames(){
    this.gameService.getGames(this.page, this.pageSize).subscribe(data => {
      this.gamesList = data.content;
      this.totalElements = data.totalElements
      this.pageSize = data.size
      });
      this.categoriaSelecionada = 'ALL'
      this.selected = 'ALL'
  }

  getCategories(){
    this.categoriaService.getCategoriasNoPagination().subscribe(data => {
      this.categoriasList = data.content;
    })
  }

  getGamesByCategory(nomeCategoria: string, page: number, pageSize: number){
    this.gameService.getGamesByCategory(nomeCategoria, page, pageSize).subscribe(data => {
      this.gamesList = data.content
      this.totalElements = data.totalElements
    }, (error) => {
      console.log(error)
    })
  }

  getGamesByString(string: string, page: number, pageSize: number){
    this.gameService.getGamesByString(string, page, pageSize).subscribe(data => {
      this.gamesList = data.content
      this.totalElements = data.totalElements
    })
  }

  getGamesByStringAndCategory(string: string, categoriaSelecionada: string, page: number, pageSize: number){
    this.gameService.getGamesByStringAndCategory(string, categoriaSelecionada, page, pageSize).subscribe( data => {
      this.gamesList = data.content
      this.totalElements = data.totalElements
    })
  }

  excluirGame(game: Game): void{
      Swal.fire({
        title: 'Are you sure you want to remove ' + game.nome +'?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.gameService.deleteGame(game.id).subscribe(() => {
            if(this.categoriaSelecionada == 'ALL'){
              this.getGames()
            }else{
              this.getGamesByCategory(this.categoriaSelecionada, this.page, this.pageSize);
            }
             Swal.fire(
            'Deleted!',
            game.nome +' has been deleted.',
            'success'
          )
          })
        }
      })
  }

  adicionarGame(): void {
    const dialogRef = this.dialog.open(GameFormDialogComponent, {
     width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
       if(dialogRef.componentInstance.manterLista ){
        return
       }else if(!dialogRef.componentInstance.manterLista){
        this.getGames()
       }
    })
  }

  atualizarGame(id: any): void {
    const dialogRef = this.dialog.open(GameEditFormDialogComponent, {
     width: '600px'
    });
    dialogRef.componentInstance.id = id;
    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.recarregarLista ){
        if(this.categoriaSelecionada != 'ALL'){
          this.getGamesByCategory(this.categoriaSelecionada, this.page, this.pageSize);
        } else if(this.categoriaSelecionada == 'ALL'){
          this.getGames()
        }
      } else if(!dialogRef.componentInstance.recarregarLista){
        return
      }
    })
  }

  onPaginateChange(event: PageEvent) {
    this.page = event.pageIndex
    this.pageSize = event.pageSize

    if(this.categoriaSelecionada == 'ALL'){
      this.getGamesByString(this.searchInputText , this.page, this.pageSize);
    } else{
      this.getGamesByStringAndCategory(this.searchInputText, this.categoriaSelecionada, this.page, this.pageSize);
    }
  }

  forEachTypedCharacter(e?: Event){
    this.page = 0
    const target = e.target as HTMLInputElement;
    const value = target.value

    if(this.categoriaSelecionada == 'ALL'){
      this.getGamesByString(value, this.page, this.pageSize);
    } else{
      this.getGamesByStringAndCategory(value, this.categoriaSelecionada, this.page, this.pageSize);
    }
  }



  listarGamesPorCategoria(value: any){
    this.page = 0
    this.searchInputText = ''
    if(value.id === undefined){
      this.getGames();
      this.categoriaSelecionada = 'ALL'
    } else{
      this.categoriaSelecionada = value.nome
      this.getGamesByCategory(this.categoriaSelecionada, this.page, this.pageSize)
    }
  }

  limparFiltro(){
    this.searchInputText = ''
    this.page = 0

    if(this.categoriaSelecionada == 'ALL'){
      this.getGamesByString(this.searchInputText, this.page, this.pageSize);
    } else{
      this.getGamesByStringAndCategory(this.searchInputText, this.categoriaSelecionada, this.page, this.pageSize)
    }
  }

  seeGameDetails(id: number){
    const dialogRef = this.dialog.open(GameDetailsDialogComponent, {
      width: '700px',
      height: '690px'
     });
     dialogRef.componentInstance.id = id;
     dialogRef.afterClosed().subscribe(result => {

     })
  }
}
