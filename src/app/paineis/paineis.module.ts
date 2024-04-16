import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesComponent } from './slides/slides.component';
import { CadastrosComponent } from './cadastros/cadastros.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ApresentacaoComponent } from './apresentacao/apresentacao.component';



@NgModule({
  declarations: [SlidesComponent, CadastrosComponent, PedidosComponent, ApresentacaoComponent],
  exports: [SlidesComponent, CadastrosComponent, PedidosComponent, ApresentacaoComponent],
  imports: [
    CommonModule
  ]
})
export class PaineisModule { }
