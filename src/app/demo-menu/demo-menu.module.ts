import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemoMenuPageRoutingModule } from './demo-menu-routing.module';

import { DemoMenuPage } from './demo-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemoMenuPageRoutingModule
  ],
  declarations: [DemoMenuPage]
})
export class DemoMenuPageModule {}
