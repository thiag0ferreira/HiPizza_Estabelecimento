import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AntendenteEntregadoresPage } from './antendente-entregadores.page';

const routes: Routes = [
  {
    path: '',
    component: AntendenteEntregadoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AntendenteEntregadoresPageRoutingModule {}
