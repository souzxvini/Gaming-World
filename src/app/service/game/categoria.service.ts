import { Categoria } from './../../model/categoria.model';
import { ResponsePageable } from '../../model/response-pageable.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  url = 'http://localhost:8080/categorias'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  public getCategorias(): Observable<ResponsePageable>{
    return this.http.get<ResponsePageable>(this.url);
  }

  public postCategoria(categoria: Categoria): Observable<Categoria>{
    return this.http.post<Categoria>(this.url, categoria, this.httpOptions)
  }

  public deleteCategoria(id: any): Observable<any>{
    return this.http.delete<Categoria>(`${this.url}/${id}`);
  }
}
