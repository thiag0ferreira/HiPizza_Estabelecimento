import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidostatusmodalPage } from './pedidostatusmodal.page';

const routes: Routes = [
  {
    path: '',
    component: PedidostatusmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidostatusmodalPageRoutingModule {}
