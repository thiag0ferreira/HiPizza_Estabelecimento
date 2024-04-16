import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemoPedidosPageRoutingModule } from './demo-pedidos-routing.module';

import { DemoPedidosPage } from './demo-pedidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemoPedidosPageRoutingModule
  ],
  declarations: [DemoPedidosPage]
})
export class DemoPedidosPageModule {}
