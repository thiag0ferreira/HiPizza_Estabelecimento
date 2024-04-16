import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemoEnderecoPageRoutingModule } from './demo-endereco-routing.module';

import { DemoEnderecoPage } from './demo-endereco.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemoEnderecoPageRoutingModule
  ],
  declarations: [DemoEnderecoPage]
})
export class DemoEnderecoPageModule {}
