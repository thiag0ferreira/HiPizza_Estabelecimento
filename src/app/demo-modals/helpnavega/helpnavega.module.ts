import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpnavegaPageRoutingModule } from './helpnavega-routing.module';

import { HelpnavegaPage } from './helpnavega.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpnavegaPageRoutingModule
  ],
  declarations: [HelpnavegaPage]
})
export class HelpnavegaPageModule {}
