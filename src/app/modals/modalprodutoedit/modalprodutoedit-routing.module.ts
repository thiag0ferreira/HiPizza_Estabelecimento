import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalprodutoeditPage } from './modalprodutoedit.page';

const routes: Routes = [
  {
    path: '',
    component: ModalprodutoeditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalprodutoeditPageRoutingModule {}
