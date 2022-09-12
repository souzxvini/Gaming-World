import { ResponsePageable } from './../../model/response-pageable.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  url = 'http://localhost:8080/jogos'

  constructor(private http: HttpClient) { }

  buscarGames(): Observable<any>{
    return this.http.get<ResponsePageable>(this.url)
  }

}
