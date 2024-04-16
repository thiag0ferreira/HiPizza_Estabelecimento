import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpnovoprodutoPageRoutingModule } from './helpnovoproduto-routing.module';

import { HelpnovoprodutoPage } from './helpnovoproduto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpnovoprodutoPageRoutingModule
  ],
  declarations: [HelpnovoprodutoPage]
})
export class HelpnovoprodutoPageModule {}
