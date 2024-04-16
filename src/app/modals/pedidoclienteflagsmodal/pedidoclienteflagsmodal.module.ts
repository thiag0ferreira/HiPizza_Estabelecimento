import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoclienteflagsmodalPageRoutingModule } from './pedidoclienteflagsmodal-routing.module';

import { PedidoclienteflagsmodalPage } from './pedidoclienteflagsmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoclienteflagsmodalPageRoutingModule
  ],
  declarations: [PedidoclienteflagsmodalPage]
})
export class PedidoclienteflagsmodalPageModule {}
