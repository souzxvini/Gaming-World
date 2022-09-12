import { GameService } from './service/game/game.service';
import { FooterModule } from './componentes/footer/footer.module';
import { HeaderModule } from './componentes/header/header.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HeaderModule,
    FooterModule,
    NgbModule,
    HttpClientModule,
    MatTabsModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
