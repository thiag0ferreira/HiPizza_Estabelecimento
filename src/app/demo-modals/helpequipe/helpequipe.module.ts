import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpequipePageRoutingModule } from './helpequipe-routing.module';

import { HelpequipePage } from './helpequipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpequipePageRoutingModule
  ],
  declarations: [HelpequipePage]
})
export class HelpequipePageModule {}
