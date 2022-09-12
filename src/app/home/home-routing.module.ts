import { ListaCategoriasComponent } from './../views/lista-categorias/lista-categorias.component';
import { ListaGamesComponent } from './../views/lista-games/lista-games.component';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'games',
    component: ListaGamesComponent
  },
  {
    path: 'categorias',
    component: ListaCategoriasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
