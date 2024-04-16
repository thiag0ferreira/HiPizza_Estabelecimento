import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelphorariosPageRoutingModule } from './helphorarios-routing.module';

import { HelphorariosPage } from './helphorarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelphorariosPageRoutingModule
  ],
  declarations: [HelphorariosPage]
})
export class HelphorariosPageModule {}
