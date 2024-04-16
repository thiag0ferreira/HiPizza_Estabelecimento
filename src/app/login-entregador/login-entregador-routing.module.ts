import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginEntregadorPage } from './login-entregador.page';

const routes: Routes = [
  {
    path: '',
    component: LoginEntregadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginEntregadorPageRoutingModule {}
