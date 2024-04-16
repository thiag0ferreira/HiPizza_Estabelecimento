import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemoEquipePage } from './demo-equipe.page';

const routes: Routes = [
  {
    path: '',
    component: DemoEquipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoEquipePageRoutingModule {}
