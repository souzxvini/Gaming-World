import { GameEditFormDialogComponent } from './../game-edit-form-dialog/game-edit-form-dialog.component';
import { GameFormDialogComponent } from './../game-form-dialog/game-form-dialog.component';
import { Game } from './../../model/game.model';
import { GameService } from './../../service/game/game.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-games',
  templateUrl: './lista-games.component.html',
  styleUrls: ['./lista-games.component.css']
})
export class ListaGamesComponent implements OnInit {

  gamesList: Game[] = new Array<Game>();

  constructor(private gameService: GameService,
    private dialog: MatDialog) {
    this.listarGames();
   }

  ngOnInit(): void {
  }

  listarGames(){
    this.gameService.getGames().subscribe(data => {
      this.gamesList = data.content;
      });
  }

  adicionarGame(): void {
    const dialogRef = this.dialog.open(GameFormDialogComponent, {
     width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('the dialog was closed');
      this.listarGames()
    })
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
            this.listarGames()
             Swal.fire(
            'Deleted!',
            game.nome +' has been deleted.',
            'success'
          )
          })
        }
      })

    ;
  }

  atualizarGame(id: any): void {
    const dialogRef = this.dialog.open(GameEditFormDialogComponent, {

     width: '600px'
    });

    dialogRef.componentInstance.id = id;

    dialogRef.afterClosed().subscribe(result => {
      this.listarGames()
    })
  }

}
