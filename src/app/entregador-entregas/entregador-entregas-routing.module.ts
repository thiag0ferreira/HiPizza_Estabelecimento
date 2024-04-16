import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntregadorEntregasPage } from './entregador-entregas.page';

const routes: Routes = [
  {
    path: '',
    component: EntregadorEntregasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntregadorEntregasPageRoutingModule {}
