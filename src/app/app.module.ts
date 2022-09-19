import { GameDetailsDialogComponent } from './views/game-details-dialog/game-details-dialog.component';
import { CategoriaEditFormDialogComponent } from './views/categoria-edit-form-dialog/categoria-edit-form-dialog.component';
import { CategoriaFormDialogComponent } from './views/categoria-form-dialog/categoria-form-dialog.component';
import { MensagemModule } from './componentes/mensagem/mensagem.module';
import { GameFormDialogComponent } from './views/game-form-dialog/game-form-dialog.component';
import { HeaderSecundarioModule } from './componentes/header-secundario/header-secundario.module';
import { FooterModule } from './componentes/footer/footer.module';
import { HeaderModule } from './componentes/header/header.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { GameEditFormDialogComponent } from './views/game-edit-form-dialog/game-edit-form-dialog.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgxPaginationModule } from 'ngx-pagination';
import { CurrencyPipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    GameFormDialogComponent,
    GameEditFormDialogComponent,
    CategoriaFormDialogComponent,
    CategoriaEditFormDialogComponent,
    GameDetailsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HeaderModule,
    HeaderSecundarioModule,
    FooterModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MensagemModule,
    SweetAlert2Module.forRoot(),
    CurrencyMaskModule,
    NgxPaginationModule

  ],
  exports:[
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
