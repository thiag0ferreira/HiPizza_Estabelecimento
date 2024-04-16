import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosclientemodalPageRoutingModule } from './pedidosclientemodal-routing.module';

import { PedidosclientemodalPage } from './pedidosclientemodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosclientemodalPageRoutingModule
  ],
  declarations: [PedidosclientemodalPage]
})
export class PedidosclientemodalPageModule {}
