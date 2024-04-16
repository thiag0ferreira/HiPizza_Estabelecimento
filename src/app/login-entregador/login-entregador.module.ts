import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginEntregadorPageRoutingModule } from './login-entregador-routing.module';

import { LoginEntregadorPage } from './login-entregador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginEntregadorPageRoutingModule
  ],
  declarations: [LoginEntregadorPage]
})
export class LoginEntregadorPageModule {}
