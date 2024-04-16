import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardapiopadraoPage } from './cardapiopadrao.page';

const routes: Routes = [
  {
    path: '',
    component: CardapiopadraoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardapiopadraoPageRoutingModule {}
