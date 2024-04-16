import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstabelecimentoPage } from '../estabelecimento/estabelecimento.page';
import { EquipePage } from '../equipe/equipe.page';
import { ProdutosPage } from '../produtos/produtos.page';
import { EnderecoPage } from '../endereco/endereco.page';

import { MenuPage } from './menu.page';
import { from } from 'rxjs';
import { FormapagaPage } from '../formapaga/formapaga.page';

const routes: Routes = [
  {
    path: '', component: MenuPage,
    children: [
      { path: 'stab', component: EstabelecimentoPage },
      { path: 'equipe', component: EquipePage },
      { path: 'card', component: ProdutosPage },
      { path: 'ender', component: EnderecoPage },
      { path: 'paga', component: FormapagaPage }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
