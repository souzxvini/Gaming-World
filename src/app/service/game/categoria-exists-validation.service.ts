import { CategoriaService } from 'src/app/service/game/categoria.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { AbstractControl } from '@angular/forms';
import { first, map, switchMap } from 'rxjs';
import { Categoria } from 'src/app/model/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaExistsValidationService {

  url = 'http://localhost:8080/categorias'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient,
    private categoriaService: CategoriaService) { }

  categoryExists(){
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        switchMap((categoryName) =>
          this.categoriaService.verifyExistentCategory(categoryName)
        ),
        map((categoryExists) =>
          (categoryExists ? { existentCategory: true } : null),
        ),
        first()
      );
    }
  }

}
