import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoEnderecoPage } from '../demo-endereco/demo-endereco.page';
import { DemoEquipePage } from '../demo-equipe/demo-equipe.page';
import { DemoFormapagaPage } from '../demo-formapaga/demo-formapaga.page';
import { DemoProdutosPage } from '../demo-produtos/demo-produtos.page';
import { DemoStabPage } from '../demo-stab/demo-stab.page';

import { DemoMenuPage } from './demo-menu.page';

const routes: Routes = [
  {
    path: '',
    component: DemoMenuPage,
    children: [
      { path: 'stab', component: DemoStabPage },
      { path: 'equipe', component: DemoEquipePage },
      { path: 'card', component: DemoProdutosPage },
      { path: 'ender', component: DemoEnderecoPage },
      { path: 'paga', component: DemoFormapagaPage }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoMenuPageRoutingModule {}
