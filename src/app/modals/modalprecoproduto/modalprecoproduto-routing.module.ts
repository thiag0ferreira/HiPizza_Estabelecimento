import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalprecoprodutoPage } from './modalprecoproduto.page';

const routes: Routes = [
  {
    path: '',
    component: ModalprecoprodutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalprecoprodutoPageRoutingModule {}
