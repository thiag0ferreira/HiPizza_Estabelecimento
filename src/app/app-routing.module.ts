import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'cadastro-basico',
    loadChildren: () => import('./cadastro-basico/cadastro-basico.module').then( m => m.CadastroBasicoPageModule)
  },
  {
    path: 'cadastro-verifica-email',
    loadChildren: () => import('./cadastro-verifica-email/cadastro-verifica-email.module').then( m => m.CadastroVerificaEmailPageModule)
  },
  {
    path: 'estabelecimento',
    loadChildren: () => import('./estabelecimento/estabelecimento.module').then( m => m.EstabelecimentoPageModule)
  },
  {
    path: 'modalestabelecimento',
    loadChildren: () => import('./modals/modalestabelecimento/modalestabelecimento.module').then( m => m.ModalestabelecimentoPageModule)
  },
  {
    path: 'equipe',
    loadChildren: () => import('./equipe/equipe.module').then( m => m.EquipePageModule)
  },
  {
    path: 'modalequipe',
    loadChildren: () => import('./modals/modalequipe/modalequipe.module').then( m => m.ModalequipePageModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('./produtos/produtos.module').then( m => m.ProdutosPageModule)
  },
  {
    path: 'modalprodutos',
    loadChildren: () => import('./modals/modalprodutos/modalprodutos.module').then( m => m.ModalprodutosPageModule)
  },
  {
    path: 'modalnovoatrib',
    loadChildren: () => import('./modals/modalnovoatrib/modalnovoatrib.module').then( m => m.ModalnovoatribPageModule)
  },
  {
    path: 'modalprecoproduto',
    loadChildren: () => import('./modals/modalprecoproduto/modalprecoproduto.module').then( m => m.ModalprecoprodutoPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'recupera-cadastro',
    loadChildren: () => import('./recupera-cadastro/recupera-cadastro.module').then( m => m.RecuperaCadastroPageModule)
  },
  {
    path: 'endereco',
    loadChildren: () => import('./endereco/endereco.module').then( m => m.EnderecoPageModule)
  },
  {
    path: 'formapaga',
    loadChildren: () => import('./formapaga/formapaga.module').then( m => m.FormapagaPageModule)
  },
  {
    path: 'modalfopag',
    loadChildren: () => import('./modals/modalfopag/modalfopag.module').then( m => m.ModalfopagPageModule)
  },
  {
    path: 'modalhora',
    loadChildren: () => import('./modals/modalhora/modalhora.module').then( m => m.ModalhoraPageModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'modalpedido',
    loadChildren: () => import('./modals/modalpedido/modalpedido.module').then( m => m.ModalpedidoPageModule)
  },
  {
    path: 'pedidosclientemodal',
    loadChildren: () => import('./modals/pedidosclientemodal/pedidosclientemodal.module').then( m => m.PedidosclientemodalPageModule)
  },
  {
    path: 'pedidoclienteflagsmodal',
    loadChildren: () => import('./modals/pedidoclienteflagsmodal/pedidoclienteflagsmodal.module').then( m => m.PedidoclienteflagsmodalPageModule)
  },
  {
    path: 'pedidostatusmodal',
    loadChildren: () => import('./modals/pedidostatusmodal/pedidostatusmodal.module').then( m => m.PedidostatusmodalPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'entregadormodal',
    loadChildren: () => import('./modals/entregadormodal/entregadormodal.module').then( m => m.EntregadormodalPageModule)
  },
  {
    path: 'demo-stab',
    loadChildren: () => import('./demo-stab/demo-stab.module').then( m => m.DemoStabPageModule)
  },
  {
    path: 'demo-pedidos',
    loadChildren: () => import('./demo-pedidos/demo-pedidos.module').then( m => m.DemoPedidosPageModule)
  },
  {
    path: 'demo-menu',
    loadChildren: () => import('./demo-menu/demo-menu.module').then( m => m.DemoMenuPageModule)
  },
  {
    path: 'demo-equipe',
    loadChildren: () => import('./demo-equipe/demo-equipe.module').then( m => m.DemoEquipePageModule)
  },
  {
    path: 'demo-produtos',
    loadChildren: () => import('./demo-produtos/demo-produtos.module').then( m => m.DemoProdutosPageModule)
  },
  {
    path: 'demo-endereco',
    loadChildren: () => import('./demo-endereco/demo-endereco.module').then( m => m.DemoEnderecoPageModule)
  },
  {
    path: 'demo-formapaga',
    loadChildren: () => import('./demo-formapaga/demo-formapaga.module').then( m => m.DemoFormapagaPageModule)
  },
  {
    path: 'helphorarios',
    loadChildren: () => import('./demo-modals/helphorarios/helphorarios.module').then( m => m.HelphorariosPageModule)
  },
  {
    path: 'helpequipe',
    loadChildren: () => import('./demo-modals/helpequipe/helpequipe.module').then( m => m.HelpequipePageModule)
  },
  {
    path: 'helpnavega',
    loadChildren: () => import('./demo-modals/helpnavega/helpnavega.module').then( m => m.HelpnavegaPageModule)
  },
  {
    path: 'helpnovoproduto',
    loadChildren: () => import('./demo-modals/helpnovoproduto/helpnovoproduto.module').then( m => m.HelpnovoprodutoPageModule)
  },
  {
    path: 'helpendereco',
    loadChildren: () => import('./demo-modals/helpendereco/helpendereco.module').then( m => m.HelpenderecoPageModule)
  },
  {
    path: 'helpformas',
    loadChildren: () => import('./demo-modals/helpformas/helpformas.module').then( m => m.HelpformasPageModule)
  },
  {
    path: 'helpedido',
    loadChildren: () => import('./demo-modals/helpedido/helpedido.module').then( m => m.HelpedidoPageModule)
  },
  {
    path: 'cardapiopadrao',
    loadChildren: () => import('./modals/cardapiopadrao/cardapiopadrao.module').then( m => m.CardapiopadraoPageModule)
  },
  {
    path: 'modalprodutotipo',
    loadChildren: () => import('./modals/modalprodutotipo/modalprodutotipo.module').then( m => m.ModalprodutotipoPageModule)
  },
  {
    path: 'modalprodutoedit',
    loadChildren: () => import('./modals/modalprodutoedit/modalprodutoedit.module').then( m => m.ModalprodutoeditPageModule)
  },
  {
    path: 'produtosordertipo',
    loadChildren: () => import('./modals/produtosordertipo/produtosordertipo.module').then( m => m.ProdutosordertipoPageModule)
  },
  {
    path: 'login-entregador',
    loadChildren: () => import('./login-entregador/login-entregador.module').then( m => m.LoginEntregadorPageModule)
  },
  {
    path: 'entregador',
    loadChildren: () => import('./entregador/entregador.module').then( m => m.EntregadorPageModule)
  },
  {
    path: 'entregador-estabelecimento',
    loadChildren: () => import('./entregador-estabelecimento/entregador-estabelecimento.module').then( m => m.EntregadorEstabelecimentoPageModule)
  },
  {
    path: 'entregador-dados',
    loadChildren: () => import('./entregador-dados/entregador-dados.module').then( m => m.EntregadorDadosPageModule)
  },
  {
    path: 'entregador-entregas',
    loadChildren: () => import('./entregador-entregas/entregador-entregas.module').then( m => m.EntregadorEntregasPageModule)
  },
  {
    path: 'modalentrega',
    loadChildren: () => import('./modals/modalentrega/modalentrega.module').then( m => m.ModalentregaPageModule)
  },
  {
    path: 'login-atendente',
    loadChildren: () => import('./login-atendente/login-atendente.module').then( m => m.LoginAtendentePageModule)
  },
  {
    path: 'atendente',
    loadChildren: () => import('./atendente/atendente.module').then( m => m.AtendentePageModule)
  },
  {
    path: 'antendente-entregadores',
    loadChildren: () => import('./antendente-entregadores/antendente-entregadores.module').then( m => m.AntendenteEntregadoresPageModule)
  },
  {
    path: 'atendente-trabalha-entregador',
    loadChildren: () => import('./atendente-trabalha-entregador/atendente-trabalha-entregador.module').then( m => m.AtendenteTrabalhaEntregadorPageModule)
  },
  {
    path: 'meio-a-meio',
    loadChildren: () => import('./modals/meio-a-meio/meio-a-meio.module').then( m => m.MeioAMeioPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
