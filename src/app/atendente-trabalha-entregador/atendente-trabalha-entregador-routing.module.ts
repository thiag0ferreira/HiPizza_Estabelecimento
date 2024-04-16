import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtendenteTrabalhaEntregadorPage } from './atendente-trabalha-entregador.page';

const routes: Routes = [
  {
    path: '',
    component: AtendenteTrabalhaEntregadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtendenteTrabalhaEntregadorPageRoutingModule {}
