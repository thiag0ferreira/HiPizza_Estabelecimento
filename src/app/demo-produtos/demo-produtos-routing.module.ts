import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemoProdutosPage } from './demo-produtos.page';

const routes: Routes = [
  {
    path: '',
    component: DemoProdutosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoProdutosPageRoutingModule {}
