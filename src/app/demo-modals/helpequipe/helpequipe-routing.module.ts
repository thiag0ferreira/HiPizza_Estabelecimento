import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpequipePage } from './helpequipe.page';

const routes: Routes = [
  {
    path: '',
    component: HelpequipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpequipePageRoutingModule {}
