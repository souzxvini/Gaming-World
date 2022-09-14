import { GameFormDialogComponent } from './../game-form-dialog/game-form-dialog.component';
import { Game } from './../../model/game.model';
import { GameService } from './../../service/game/game.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

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
      console.log("aaaaaa")
      console.log(this.gamesList)
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

  excluirGame(id: number): void{
    console.log(id)
    this.gameService.deleteGame(id).subscribe(() => {
      console.log("xecuwenvibnwe")
      this.listarGames()
    });
  }


}
