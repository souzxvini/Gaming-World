import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderSecundarioComponent } from './header-secundario.component';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    HeaderSecundarioComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule
  ],
  exports:[
    HeaderSecundarioComponent
  ]
})
export class HeaderSecundarioModule { }
