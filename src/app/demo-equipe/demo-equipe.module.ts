import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemoEquipePageRoutingModule } from './demo-equipe-routing.module';

import { DemoEquipePage } from './demo-equipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemoEquipePageRoutingModule
  ],
  declarations: [DemoEquipePage]
})
export class DemoEquipePageModule {}
