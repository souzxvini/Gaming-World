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
    this.listarGames();
    this.listarCategorias();
   }

  ngOnInit(): void {
  }

  listarGames(){
    this.gameService.getGames(this.page, this.pageSize).subscribe(data => {
      this.gamesList = data.content;
      this.totalElements = data.totalElements
      this.pageSize = data.size
      });

      this.categoriaSelecionada = 'ALL'
      this.selected = 'ALL'
  }

  excluirGame(game: Game): void{
      Swal.fire({
        title: 'Are you sure you want to remove ' + game.nome +'?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.gameService.deleteGame(game.id).subscribe(() => {
            if(this.categoriaSelecionada == 'ALL'){
              this.listarGames()
            }else{
               this.gameService.getGamesByCategory(this.categoriaSelecionada, this.page, this.pageSize).subscribe(data => {
              this.gamesList = data.content
              this.totalElements = data.totalElements
            }, (error) => {
              console.log(error)
            })
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

       }else if(!dialogRef.componentInstance.manterLista){
        this.listarGames()
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
          this.gameService.getGamesByCategory(this.categoriaSelecionada, this.page, this.pageSize).subscribe(data => {
          this.gamesList = data.content
          this.totalElements = data.totalElements
        }, (error) => {
          console.log(error)
        })
        } else if(this.categoriaSelecionada == 'ALL'){
          this.listarGames()
        }

      }else if(!dialogRef.componentInstance.recarregarLista){

      }
    })
  }

  listarCategorias(){
    this.categoriaService.getCategorias().subscribe(data => {
      this.categoriasList = data.content;
    })
  }

  onPaginateChange(event: PageEvent) {
    this.page = event.pageIndex
    this.pageSize = event.pageSize

    if(this.categoriaSelecionada == 'ALL'){
      this.gameService.getGames(this.page, this.pageSize).subscribe(data => {
        this.gamesList = data.content
        this.totalElements = data.totalElements
      })
    } else{
      this.gameService.getGamesByCategory(this.categoriaSelecionada, this.page, this.pageSize).subscribe(data => {
        this.gamesList = data.content
        this.totalElements = data.totalElements
      }, (error) => {
        console.log(error)
      })
    }

  }

  listarGamesPorCategoria(value: any){
    this.page = 0
    this.searchInputText = ''
    if(value.id === undefined){
      this.gameService.getGames(this.page, this.pageSize).subscribe(data => {
        this.gamesList = data.content;
        this.totalElements = data.totalElements
        this.categoriaSelecionada = 'ALL'
      })
    } else{
        this.categoriaSelecionada = value.nome
        this.gameService.getGamesByCategory(value.nome, this.page, this.pageSize).subscribe(data => {
        this.gamesList = data.content
        this.totalElements = data.totalElements
      }, (error) => {
        console.log(error)
      })
    }
  }

  getGamesByString(e?: Event){
    this.page = 0
    const target = e.target as HTMLInputElement;
    const value = target.value
    console.log(value)

    if(this.categoriaSelecionada == 'ALL'){
      this.gameService.getGamesByString(value, this.page, this.pageSize).subscribe(data => {
        this.gamesList = data.content
        this.totalElements = data.totalElements
      })
    } else{
      this.gameService.getGamesByStringAndCategory(value, this.categoriaSelecionada, this.page, this.pageSize).subscribe( data => {
        this.gamesList = data.content
        this.totalElements = data.totalElements
      })
    }
  }

  limparFiltro(){
    this.searchInputText = ''
    this.page = 0

    if(this.categoriaSelecionada == 'ALL'){
      this.gameService.getGamesByString(this.searchInputText , this.page, this.pageSize).subscribe(data => {
        this.gamesList = data.content
        this.totalElements = data.totalElements
      })
    } else{
      this.gameService.getGamesByStringAndCategory(this.searchInputText , this.categoriaSelecionada, this.page, this.pageSize).subscribe( data => {
        this.gamesList = data.content
        this.totalElements = data.totalElements
      })
    }
  }
}
