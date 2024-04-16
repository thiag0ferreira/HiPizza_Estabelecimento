import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalfopagPageRoutingModule } from './modalfopag-routing.module';

import { ModalfopagPage } from './modalfopag.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalfopagPageRoutingModule
  ],
  declarations: [ModalfopagPage]
})
export class ModalfopagPageModule {}
