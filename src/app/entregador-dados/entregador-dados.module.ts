import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntregadorDadosPageRoutingModule } from './entregador-dados-routing.module';

import { EntregadorDadosPage } from './entregador-dados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntregadorDadosPageRoutingModule
  ],
  declarations: [EntregadorDadosPage]
})
export class EntregadorDadosPageModule {}
