import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalprodutosPageRoutingModule } from './modalprodutos-routing.module';

import { ModalprodutosPage } from './modalprodutos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalprodutosPageRoutingModule
  ],
  declarations: [ModalprodutosPage]
})
export class ModalprodutosPageModule {}
