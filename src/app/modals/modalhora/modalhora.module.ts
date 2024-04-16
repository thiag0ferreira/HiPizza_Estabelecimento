import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalhoraPageRoutingModule } from './modalhora-routing.module';

import { ModalhoraPage } from './modalhora.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalhoraPageRoutingModule
  ],
  declarations: [ModalhoraPage]
})
export class ModalhoraPageModule {}
