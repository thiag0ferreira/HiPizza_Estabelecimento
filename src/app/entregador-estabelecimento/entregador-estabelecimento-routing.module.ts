import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntregadorEstabelecimentoPage } from './entregador-estabelecimento.page';

const routes: Routes = [
  {
    path: '',
    component: EntregadorEstabelecimentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntregadorEstabelecimentoPageRoutingModule {}
