import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroBasicoPage } from './cadastro-basico.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroBasicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroBasicoPageRoutingModule {}
