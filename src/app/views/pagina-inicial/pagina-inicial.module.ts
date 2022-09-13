import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaInicialComponent } from './pagina-inicial.component';
import { PaginaInicialRoutingModule } from './pagina-inicial-routing.module';



@NgModule({
  declarations: [
    PaginaInicialComponent
  ],
  imports: [
    CommonModule,
    PaginaInicialRoutingModule
  ]
})
export class PaginaInicialModule { }
