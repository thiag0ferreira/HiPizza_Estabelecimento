import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalhoraPage } from './modalhora.page';

const routes: Routes = [
  {
    path: '',
    component: ModalhoraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalhoraPageRoutingModule {}
