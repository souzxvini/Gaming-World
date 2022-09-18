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

  public getGames(page: any, size: any): Observable<ResponsePageable>{
    return this.http.get<ResponsePageable>( `${this.url}?page=${page}&size=${size}`);
  }

  public postGame(game: Game): Observable<Game>{
    return this.http.post<Game>(this.url, game, this.httpOptions)
  }

  public deleteGame(id: any): Observable<any>{
    return this.http.delete<Game>(`${this.url}/${id}`);
  }

  public getGameDetails(id: any): Observable<Game>{
    return this.http.get<Game>(`${this.url}/${id}`)
  }

  public updateGame(game: Game): Observable<Game>{
    return this.http.put<Game>(`${this.url}/${game.id}`, game,this.httpOptions)
  }

  public getGamesByCategory(category: string, page: any, size: any): Observable<ResponsePageable>{
    return this.http.get<ResponsePageable>( `${this.url}/categoria?nomeCategoria=${category}&page=${page}&size=${size}`);
  }

  public getGamesByString(string: string, page: any, size: any): Observable<ResponsePageable>{
    return this.http.get<ResponsePageable>( `${this.url}/string?nome=${string}&page=${page}&size=${size}`);
  }

  public getGamesByStringAndCategory(string: string, category: string, page: any, size: any): Observable<ResponsePageable>{
    return this.http.get<ResponsePageable>( `${this.url}/porStringECategoria?nome=${string}&nomeCategoria=${category}&page=${page}&size=${size}`);
  }
}
