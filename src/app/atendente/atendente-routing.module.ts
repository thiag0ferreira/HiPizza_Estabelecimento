import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AntendenteEntregadoresPage } from '../antendente-entregadores/antendente-entregadores.page';
import { EntregadorDadosPage } from '../entregador-dados/entregador-dados.page';
import { EntregadorEstabelecimentoPage } from '../entregador-estabelecimento/entregador-estabelecimento.page';
import { PedidosComponent } from '../paineis/pedidos/pedidos.component';
import { PedidosPage } from '../pedidos/pedidos.page';

import { AtendentePage } from './atendente.page';

const routes: Routes = [
  {
    path: '', component: AtendentePage,
    children: [
      { path: 'stab', component: EntregadorEstabelecimentoPage },
      { path: 'pedidos', component: PedidosPage },
      { path: 'entregadores', component: AntendenteEntregadoresPage },
      { path: 'dados', component: EntregadorDadosPage },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtendentePageRoutingModule {}
