import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalprecoprodutoPageRoutingModule } from './modalprecoproduto-routing.module';

import { ModalprecoprodutoPage } from './modalprecoproduto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalprecoprodutoPageRoutingModule
  ],
  declarations: [ModalprecoprodutoPage]
})
export class ModalprecoprodutoPageModule {}
