import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosclientemodalPage } from './pedidosclientemodal.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosclientemodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosclientemodalPageRoutingModule {}
