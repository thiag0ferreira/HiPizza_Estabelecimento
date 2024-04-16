import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroVerificaEmailPage } from './cadastro-verifica-email.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroVerificaEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroVerificaEmailPageRoutingModule {}
