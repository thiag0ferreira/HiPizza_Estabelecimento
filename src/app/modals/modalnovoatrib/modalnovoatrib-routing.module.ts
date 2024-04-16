import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalnovoatribPage } from './modalnovoatrib.page';

const routes: Routes = [
  {
    path: '',
    component: ModalnovoatribPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalnovoatribPageRoutingModule {}
