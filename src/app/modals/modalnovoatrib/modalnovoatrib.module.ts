import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalnovoatribPageRoutingModule } from './modalnovoatrib-routing.module';

import { ModalnovoatribPage } from './modalnovoatrib.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalnovoatribPageRoutingModule
  ],
  declarations: [ModalnovoatribPage]
})
export class ModalnovoatribPageModule {}
