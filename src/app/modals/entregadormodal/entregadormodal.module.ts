import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntregadormodalPageRoutingModule } from './entregadormodal-routing.module';

import { EntregadormodalPage } from './entregadormodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntregadormodalPageRoutingModule
  ],
  declarations: [EntregadormodalPage]
})
export class EntregadormodalPageModule {}
