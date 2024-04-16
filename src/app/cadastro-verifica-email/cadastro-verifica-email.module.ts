import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroVerificaEmailPageRoutingModule } from './cadastro-verifica-email-routing.module';

import { CadastroVerificaEmailPage } from './cadastro-verifica-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroVerificaEmailPageRoutingModule
  ],
  declarations: [CadastroVerificaEmailPage]
})
export class CadastroVerificaEmailPageModule {}
