import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpformasPageRoutingModule } from './helpformas-routing.module';

import { HelpformasPage } from './helpformas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpformasPageRoutingModule
  ],
  declarations: [HelpformasPage]
})
export class HelpformasPageModule {}
