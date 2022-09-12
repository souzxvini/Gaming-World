import { ListaCategoriasRoutingModule } from './lista-categorias-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaCategoriasComponent } from './lista-categorias.component';

@NgModule({
  declarations: [
    ListaCategoriasComponent
  ],
  imports: [
    CommonModule,
    ListaCategoriasRoutingModule
  ]
})
export class ListaCategoriasModule { }
