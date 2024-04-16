import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalequipePageRoutingModule } from './modalequipe-routing.module';

import { ModalequipePage } from './modalequipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalequipePageRoutingModule
  ],
  declarations: [ModalequipePage]
})
export class ModalequipePageModule {}
