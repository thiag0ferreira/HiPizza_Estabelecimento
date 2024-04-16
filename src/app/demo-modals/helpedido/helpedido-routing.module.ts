import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpedidoPage } from './helpedido.page';

const routes: Routes = [
  {
    path: '',
    component: HelpedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpedidoPageRoutingModule {}
