import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutosordertipoPage } from './produtosordertipo.page';

const routes: Routes = [
  {
    path: '',
    component: ProdutosordertipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutosordertipoPageRoutingModule {}
