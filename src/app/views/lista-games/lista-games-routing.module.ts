import { ListaCategoriasComponent } from './../lista-categorias/lista-categorias.component';
import { ListaGamesComponent } from './lista-games.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: ListaGamesComponent,
children: [{
  path: 'categorias',
  component: ListaCategoriasComponent
}]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaGamesRoutingModule { }
