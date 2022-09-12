import { Game } from './../../model/game.model';
import { GameService } from './../../service/game/game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-games',
  templateUrl: './lista-games.component.html',
  styleUrls: ['./lista-games.component.css']
})
export class ListaGamesComponent implements OnInit {

  gamesList: Game[] = new Array<Game>();

  constructor(private gameService: GameService) {
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

}
