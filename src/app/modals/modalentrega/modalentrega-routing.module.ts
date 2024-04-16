import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalentregaPage } from './modalentrega.page';

const routes: Routes = [
  {
    path: '',
    component: ModalentregaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalentregaPageRoutingModule {}
