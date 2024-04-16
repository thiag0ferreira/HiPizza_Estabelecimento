import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpnovoprodutoPage } from './helpnovoproduto.page';

const routes: Routes = [
  {
    path: '',
    component: HelpnovoprodutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpnovoprodutoPageRoutingModule {}
