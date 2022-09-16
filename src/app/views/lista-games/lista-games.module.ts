import { FooterModule } from './../../componentes/footer/footer.module';
import { GameFormDialogModule } from './../categoria-form-dialog/categoria-form-dialog.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ListaGamesRoutingModule } from './lista-games-routing.module';
import { HeaderSecundarioModule } from './../../componentes/header-secundario/header-secundario.module';
import { RouterModule } from '@angular/router';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaGamesComponent } from './lista-games.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule} from '@angular/material/card';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {MatSelectModule} from '@angular/material/select';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
registerLocaleData(ptBr);

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
    HeaderSecundarioModule,
    ListaGamesRoutingModule,
    MatDialogModule,
    GameFormDialogModule,
    SweetAlert2Module.forRoot(),
    FooterModule,
    MatSelectModule,
    MatPaginatorModule
  ],providers:    [
    // ************************************
    { provide: LOCALE_ID, useValue: 'pt' },
    // ************************************
  ]
})
export class ListaGamesModule { }
