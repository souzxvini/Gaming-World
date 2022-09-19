import { Game } from './../../model/game.model';
import { GameService } from 'src/app/service/game/game.service';
import { Categoria } from '../../model/categoria.model';
import { CategoriaService } from '../../service/game/categoria.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CategoriaExistsValidationService } from 'src/app/service/game/categoria-exists-validation.service';

@Component({
  selector: 'app-categoria-form-dialog',
  templateUrl: './game-details-dialog.component.html',
  styleUrls: ['./game-details-dialog.component.css']
})
export class GameDetailsDialogComponent implements OnInit {

  id: number;
  game: Game = new Game();

  constructor(public dialogRef: MatDialogRef<GameDetailsDialogComponent>,
    private gameService: GameService
    ) {

    }

  ngOnInit(): void {
    this.getGame();
    console.log(this.game + "ewofvneru9bvnr9eubnv9eron")
  }

  cancel(): void{
    this.dialogRef.close();
  }

  getGame(){
    this.gameService.getGameDetails(this.id).subscribe(data => {
      this.game = data
    })
  }
}
