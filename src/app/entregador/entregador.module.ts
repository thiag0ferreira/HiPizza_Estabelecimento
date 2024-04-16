import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntregadorPageRoutingModule } from './entregador-routing.module';

import { EntregadorPage } from './entregador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntregadorPageRoutingModule
  ],
  declarations: [EntregadorPage]
})
export class EntregadorPageModule {}
