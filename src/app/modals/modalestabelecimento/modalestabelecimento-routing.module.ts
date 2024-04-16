import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalestabelecimentoPage } from './modalestabelecimento.page';

const routes: Routes = [
  {
    path: '',
    component: ModalestabelecimentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalestabelecimentoPageRoutingModule {}
