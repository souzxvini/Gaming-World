import { Categoria } from './../../model/categoria.model';
import { ResponsePageable } from '../../model/response-pageable.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  url = 'https://gaming-world-api.herokuapp.com/categorias'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  public getCategorias(page: number, pageSize: number): Observable<ResponsePageable>{
    return this.http.get<ResponsePageable>(`${this.url}?page=${page}&size=${pageSize}`);
  }

  public getCategoriasNoPagination(): Observable<any>{
    return this.http.get<any>(this.url);
  }

  public postCategoria(categoria: Categoria): Observable<Categoria>{
    return this.http.post<Categoria>(this.url, categoria, this.httpOptions)
  }

  public deleteCategoria(id: any): Observable<any>{
    return this.http.delete<Categoria>(`${this.url}/${id}`);
  }

  public getCategoriaDetails(id: any): Observable<Categoria>{
    return this.http.get<Categoria>(`${this.url}/${id}`)
  }

  public updateCategoria(categoria: Categoria): Observable<Categoria>{
    return this.http.put<Categoria>(`${this.url}/${categoria.id}`, categoria, this.httpOptions)
  }

  public getCategoriasByString(string: string, page: any, size: any): Observable<ResponsePageable>{
    return this.http.get<ResponsePageable>( `${this.url}/string?nome=${string}&page=${page}&size=${size}`);
  }

  public verifyExistentCategory(nomeCategoria: string): Observable<ResponsePageable>{
    var nome = nomeCategoria.toUpperCase();
    return this.http.get<ResponsePageable>( `${this.url}/exists?nomeCategoria=${nome}`);
  }

  public verifyExistentCategoryEditForm(id: number, nome: string): Observable<ResponsePageable>{
    var nomeCategoria = nome.toUpperCase();
    return this.http.get<ResponsePageable>( `${this.url}/edit/exists?nome=${nomeCategoria}&id=${id}`);
  }
}
