import { ResponsePageable } from './../../model/response-pageable.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Game } from 'src/app/model/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  url = 'http://localhost:8080/jogos'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  public getGames(): Observable<ResponsePageable>{
    return this.http.get<ResponsePageable>(this.url);
  }

  public postGame(game: Game): Observable<Game>{
    return this.http.post<Game>(this.url, game, this.httpOptions)
  }

  public deleteGame(id: any): Observable<any>{
    return this.http.delete<Game>(`${this.url}/${id}`);
  }

}
