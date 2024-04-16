import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemoStabPage } from './demo-stab.page';

const routes: Routes = [
  {
    path: '',
    component: DemoStabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoStabPageRoutingModule {}
