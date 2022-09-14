import { ResponsePageable } from '../../model/response-pageable.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  url = 'http://localhost:8080/categorias'

  constructor(private http: HttpClient) { }

  public getCategorias(): Observable<ResponsePageable>{
    return this.http.get<ResponsePageable>(this.url);
  }

}
