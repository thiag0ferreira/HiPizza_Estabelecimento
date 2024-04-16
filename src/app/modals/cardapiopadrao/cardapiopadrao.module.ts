import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardapiopadraoPageRoutingModule } from './cardapiopadrao-routing.module';

import { CardapiopadraoPage } from './cardapiopadrao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardapiopadraoPageRoutingModule
  ],
  declarations: [CardapiopadraoPage]
})
export class CardapiopadraoPageModule {}
