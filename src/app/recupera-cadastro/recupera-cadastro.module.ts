import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperaCadastroPageRoutingModule } from './recupera-cadastro-routing.module';

import { RecuperaCadastroPage } from './recupera-cadastro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperaCadastroPageRoutingModule
  ],
  declarations: [RecuperaCadastroPage]
})
export class RecuperaCadastroPageModule {}
