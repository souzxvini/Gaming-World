import { Game } from './../../model/game.model';
import { GameService } from './../../service/game/game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-games',
  templateUrl: './lista-games.component.html',
  styleUrls: ['./lista-games.component.css']
})
export class ListaGamesComponent implements OnInit {

  gamesList: Game[]

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.listarGames()
    console.log(this.gamesList)
  }

  listarGames(){
    this.gameService.buscarGames().subscribe(r => {
      this.gamesList = r.content;
    })
  }

}
