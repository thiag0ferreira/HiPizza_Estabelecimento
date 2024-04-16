import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpformasPage } from './helpformas.page';

const routes: Routes = [
  {
    path: '',
    component: HelpformasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpformasPageRoutingModule {}
