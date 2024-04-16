import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpenderecoPage } from './helpendereco.page';

const routes: Routes = [
  {
    path: '',
    component: HelpenderecoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpenderecoPageRoutingModule {}
