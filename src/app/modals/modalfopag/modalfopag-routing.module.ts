import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalfopagPage } from './modalfopag.page';

const routes: Routes = [
  {
    path: '',
    component: ModalfopagPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalfopagPageRoutingModule {}
