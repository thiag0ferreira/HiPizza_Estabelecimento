import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalprodutotipoPage } from './modalprodutotipo.page';

const routes: Routes = [
  {
    path: '',
    component: ModalprodutotipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalprodutotipoPageRoutingModule {}
