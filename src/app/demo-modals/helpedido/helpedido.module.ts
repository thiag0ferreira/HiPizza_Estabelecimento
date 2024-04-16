import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpedidoPageRoutingModule } from './helpedido-routing.module';

import { HelpedidoPage } from './helpedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpedidoPageRoutingModule
  ],
  declarations: [HelpedidoPage]
})
export class HelpedidoPageModule {}
