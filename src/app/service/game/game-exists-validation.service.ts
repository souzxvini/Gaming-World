import { GameService } from 'src/app/service/game/game.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { AbstractControl } from '@angular/forms';
import { first, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameExistsValidationService {

  constructor(private http: HttpClient,
    private gameService: GameService) { }

  gameExists(){
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        switchMap((gameName) =>
          this.gameService.verifyExistentGame(gameName)
        ),
        map((gameExists) =>
          (gameExists ? { existentGame: true } : null),
        ),
        first()
      );
    }
  }

}
