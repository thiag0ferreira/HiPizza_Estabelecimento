import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntregadorDadosPage } from '../entregador-dados/entregador-dados.page';
import { EntregadorEntregasPage } from '../entregador-entregas/entregador-entregas.page';
import { EntregadorEstabelecimentoPage } from '../entregador-estabelecimento/entregador-estabelecimento.page';

import { EntregadorPage } from './entregador.page';

const routes: Routes = [
  {
    path: '', component: EntregadorPage,
    children: [
      { path: 'stab', component: EntregadorEstabelecimentoPage },
      { path: 'entregas', component: EntregadorEntregasPage },
      { path: 'dados', component: EntregadorDadosPage },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntregadorPageRoutingModule {}
