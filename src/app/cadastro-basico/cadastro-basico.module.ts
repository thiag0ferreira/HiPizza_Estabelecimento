import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroBasicoPageRoutingModule } from './cadastro-basico-routing.module';

import { CadastroBasicoPage } from './cadastro-basico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroBasicoPageRoutingModule
  ],
  declarations: [CadastroBasicoPage]
})
export class CadastroBasicoPageModule {}
