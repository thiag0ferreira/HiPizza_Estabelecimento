import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormapagaPage } from './formapaga.page';

const routes: Routes = [
  {
    path: '',
    component: FormapagaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormapagaPageRoutingModule {}
