import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemoFormapagaPageRoutingModule } from './demo-formapaga-routing.module';

import { DemoFormapagaPage } from './demo-formapaga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemoFormapagaPageRoutingModule
  ],
  declarations: [DemoFormapagaPage]
})
export class DemoFormapagaPageModule {}
