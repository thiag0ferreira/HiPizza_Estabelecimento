import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalprodutotipoPageRoutingModule } from './modalprodutotipo-routing.module';

import { ModalprodutotipoPage } from './modalprodutotipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalprodutotipoPageRoutingModule
  ],
  declarations: [ModalprodutotipoPage]
})
export class ModalprodutotipoPageModule {}
