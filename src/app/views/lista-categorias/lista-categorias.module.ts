import { ListaCategoriasRoutingModule } from './lista-categorias-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaCategoriasComponent } from './lista-categorias.component';
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
import { MatDialogModule } from '@angular/material/dialog';
import { FooterModule } from 'src/app/componentes/footer/footer.module';
import { GameFormDialogModule } from '../categoria-form-dialog/categoria-form-dialog.module';
@NgModule({
  declarations: [
    ListaCategoriasComponent
  ],
  imports: [
    CommonModule,
    ListaCategoriasRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
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
  ]
})
export class ListaCategoriasModule { }
