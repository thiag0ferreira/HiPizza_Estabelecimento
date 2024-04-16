import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemoFormapagaPage } from './demo-formapaga.page';

const routes: Routes = [
  {
    path: '',
    component: DemoFormapagaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoFormapagaPageRoutingModule {}
