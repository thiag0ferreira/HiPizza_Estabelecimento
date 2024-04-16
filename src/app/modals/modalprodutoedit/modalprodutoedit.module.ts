import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalprodutoeditPageRoutingModule } from './modalprodutoedit-routing.module';

import { ModalprodutoeditPage } from './modalprodutoedit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalprodutoeditPageRoutingModule
  ],
  declarations: [ModalprodutoeditPage]
})
export class ModalprodutoeditPageModule {}
