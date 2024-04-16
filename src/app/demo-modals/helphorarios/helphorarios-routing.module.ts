import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelphorariosPage } from './helphorarios.page';

const routes: Routes = [
  {
    path: '',
    component: HelphorariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelphorariosPageRoutingModule {}
