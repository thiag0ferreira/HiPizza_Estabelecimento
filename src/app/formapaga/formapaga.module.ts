import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormapagaPageRoutingModule } from './formapaga-routing.module';

import { FormapagaPage } from './formapaga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormapagaPageRoutingModule
  ],
  declarations: [FormapagaPage]
})
export class FormapagaPageModule {}
