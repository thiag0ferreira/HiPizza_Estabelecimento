import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoclienteflagsmodalPage } from './pedidoclienteflagsmodal.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoclienteflagsmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoclienteflagsmodalPageRoutingModule {}
