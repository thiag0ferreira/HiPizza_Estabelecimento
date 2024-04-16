import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtendenteTrabalhaEntregadorPageRoutingModule } from './atendente-trabalha-entregador-routing.module';

import { AtendenteTrabalhaEntregadorPage } from './atendente-trabalha-entregador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtendenteTrabalhaEntregadorPageRoutingModule
  ],
  declarations: [AtendenteTrabalhaEntregadorPage]
})
export class AtendenteTrabalhaEntregadorPageModule {}
