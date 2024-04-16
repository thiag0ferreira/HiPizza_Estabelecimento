import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntregadorEstabelecimentoPageRoutingModule } from './entregador-estabelecimento-routing.module';

import { EntregadorEstabelecimentoPage } from './entregador-estabelecimento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntregadorEstabelecimentoPageRoutingModule
  ],
  declarations: [EntregadorEstabelecimentoPage]
})
export class EntregadorEstabelecimentoPageModule {}
