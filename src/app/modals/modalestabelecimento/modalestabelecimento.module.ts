import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalestabelecimentoPageRoutingModule } from './modalestabelecimento-routing.module';

import { ModalestabelecimentoPage } from './modalestabelecimento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalestabelecimentoPageRoutingModule
  ],
  declarations: [ModalestabelecimentoPage]
})
export class ModalestabelecimentoPageModule {}
