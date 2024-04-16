import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntregadormodalPage } from './entregadormodal.page';

const routes: Routes = [
  {
    path: '',
    component: EntregadormodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntregadormodalPageRoutingModule {}
