import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemoProdutosPageRoutingModule } from './demo-produtos-routing.module';

import { DemoProdutosPage } from './demo-produtos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemoProdutosPageRoutingModule
  ],
  declarations: [DemoProdutosPage]
})
export class DemoProdutosPageModule {}
