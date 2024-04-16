import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpnavegaPage } from './helpnavega.page';

const routes: Routes = [
  {
    path: '',
    component: HelpnavegaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpnavegaPageRoutingModule {}
