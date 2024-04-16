import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidostatusmodalPageRoutingModule } from './pedidostatusmodal-routing.module';

import { PedidostatusmodalPage } from './pedidostatusmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidostatusmodalPageRoutingModule
  ],
  declarations: [PedidostatusmodalPage]
})
export class PedidostatusmodalPageModule {}
