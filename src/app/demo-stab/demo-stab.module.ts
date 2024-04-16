import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemoStabPageRoutingModule } from './demo-stab-routing.module';

import { DemoStabPage } from './demo-stab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemoStabPageRoutingModule
  ],
  declarations: [DemoStabPage]
})
export class DemoStabPageModule {}
