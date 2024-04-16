import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpenderecoPageRoutingModule } from './helpendereco-routing.module';

import { HelpenderecoPage } from './helpendereco.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpenderecoPageRoutingModule
  ],
  declarations: [HelpenderecoPage]
})
export class HelpenderecoPageModule {}
