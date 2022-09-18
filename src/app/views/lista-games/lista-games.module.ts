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
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
registerLocaleData(ptBr);
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { ArrayFiltroPipe } from 'src/pipes/array-filtro.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    ListaGamesComponent,
    ArrayFiltroPipe

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
    MatPaginatorModule,
    MatSlideToggleModule,
    FormsModule,
    Ng2SearchPipeModule,
    MatFormFieldModule,
     MatInputModule

  ],providers:    [
    // ************************************
    { provide: LOCALE_ID, useValue: 'pt' },
    // ************************************
  ]
})
export class ListaGamesModule { }
