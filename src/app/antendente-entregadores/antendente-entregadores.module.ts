import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AntendenteEntregadoresPageRoutingModule } from './antendente-entregadores-routing.module';

import { AntendenteEntregadoresPage } from './antendente-entregadores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AntendenteEntregadoresPageRoutingModule
  ],
  declarations: [AntendenteEntregadoresPage]
})
export class AntendenteEntregadoresPageModule {}
