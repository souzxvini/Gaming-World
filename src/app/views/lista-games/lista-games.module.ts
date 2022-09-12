import { ListaGamesRoutingModule } from './lista-games-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaGamesComponent } from './lista-games.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    ListaGamesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    ListaGamesRoutingModule,

  ]
})
export class ListaGamesModule { }
