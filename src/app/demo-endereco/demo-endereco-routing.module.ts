import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemoEnderecoPage } from './demo-endereco.page';

const routes: Routes = [
  {
    path: '',
    component: DemoEnderecoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoEnderecoPageRoutingModule {}
