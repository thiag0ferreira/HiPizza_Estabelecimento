import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalentregaPageRoutingModule } from './modalentrega-routing.module';

import { ModalentregaPage } from './modalentrega.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalentregaPageRoutingModule
  ],
  declarations: [ModalentregaPage]
})
export class ModalentregaPageModule {}
