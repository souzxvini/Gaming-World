import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path:'home',
    loadChildren: ()=> import('./home/home.module').then((m)=> m.HomeModule)
  },
  {
    path:'paginaInicial',
    loadChildren: ()=> import('./views/pagina-inicial/pagina-inicial.module').then((m)=> m.PaginaInicialModule)
  },
  {
    path:'games',
    loadChildren: ()=> import('./views/lista-games/lista-games.module').then((m)=> m.ListaGamesModule)
  },
  {
    path:'categorias',
    loadChildren: ()=> import('./views/lista-categorias/lista-categorias.module').then((m)=> m.ListaCategoriasModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
