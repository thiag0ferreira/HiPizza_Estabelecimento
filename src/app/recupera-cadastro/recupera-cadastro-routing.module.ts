import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperaCadastroPage } from './recupera-cadastro.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperaCadastroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperaCadastroPageRoutingModule {}
