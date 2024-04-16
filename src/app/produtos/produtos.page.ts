import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiServices } from '../services/apiServices';
import { StorageService, Produto } from '../services/storage.service';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { FormatServices } from '../services/formatService';
import { ModalprodutosPage } from '../modals/modalprodutos/modalprodutos.page';
import { ModalprecoprodutoPage } from '../modals/modalprecoproduto/modalprecoproduto.page';
import { CardapiopadraoPage } from '../modals/cardapiopadrao/cardapiopadrao.page';
import { ModalprodutotipoPage } from '../modals/modalprodutotipo/modalprodutotipo.page';
import { ModalprodutoeditPage } from '../modals/modalprodutoedit/modalprodutoedit.page';
import { ProdutosordertipoPage } from '../modals/produtosordertipo/produtosordertipo.page';
import { MeioAMeioPage } from '../modals/meio-a-meio/meio-a-meio.page';

declare  global {
  interface String {
    toMoeda(): string;
  }
}

interface Tipo {
  id: number,
  nome: string,
  idStab: number
}

interface Prd extends Produto {
  valor: string,
  pub: boolean
}

interface Item {
  tipo: Tipo;
  produtos: Prd[]
}
@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  public idStab;
  public stab: any;
  public razaoSocial: string;
  public idxPagina: number;
  public passo: number;
  public voltar: number;
  public mais: number;
  public produto: Produto;
  public produtos: Produto[];
  public idProd: number;
  private fn: any;
  private fn2: any;
  private publicando: number;
  public itens: Item[];
  public item: Item;
  public haProd: boolean;
  public tipoNome: string;
  public pequeno: boolean;
  public grande: boolean;

  constructor(private api: ApiServices,
              private storageService: StorageService,
              public modalCtrl: ModalController,
              public alertController: AlertController,
              private formatService: FormatServices,
              private nav: NavController,
              private cdRef: ChangeDetectorRef) {
                String.prototype.toMoeda = function() {
                  const num = this;
                  const retorno = formatService.float2moeda(num);
                  return retorno;
                };
              }

  ngOnInit() {
    this.idxPagina = 0;
    this.passo = 3;
    this.voltar = 0;
    this.mais = 0;
    const tam = screen.width;
    if (tam < 768) {
      this.pequeno = true;
      this.grande = false;
    } else {
      this.pequeno = false;
      this.grande = true;
    }
    this.storageService.getEstabelecimento().then((reg) => this.gotStab(reg));
    console.log('produtos');
  }

  gotStab = (data) => {
    this.idStab = data.id;
    this.stab = data;
    this.razaoSocial = data.razaoSocial;
    this.getProdutos();
  }
  getProdutos = () => {
    this.api.reCall(this.chamaProdutos);
    this.api.getCab();
  }
  chamaProdutos = () => {
    this.api.getProdutosStab(this.idStab).then((reg) => this.gotProdutos(reg));
  }
  gotProdutos = (data) => {
    this.itens = data;
    for (const item of this.itens) {
      for(const produto of item.produtos) {
        const valor = produto.preco.toString();
        produto.valor = valor.toMoeda();
        produto.pub = produto.publicado === 1;
      }
    }
    this.trazProdutos();
  }

  trazProdutos = () => {
    if (this.itens.length > 0) {
      this.item = this.itens[this.idxPagina];
      this.tipoNome = this.item.tipo.nome;
      this.produtos = this.item.produtos;
      const k = this.idxPagina + 1;
      this.mais = (k < this.itens.length) ? 1 : 0;
      this.voltar = (this.idxPagina > 0) ? 1 : 0;
      this.haProd = (this.produtos.length > 0);
    }
  }

  precificar = (id) => {
    console.log('precificar ' + id);
    const produto = this.storageService.getJsonByCampo(this.produtos, 'id', id);
    this.storageService.setStProd(produto);
    this.openModalPreco();
  }

  apaga = (id) => {
    this.idProd = id;
    const head = 'Atenção';
    const subh = 'Decisão';
    const msg = 'Confirma intenção de apagar o produto ?';
    this.fn = this.goApaga;
    this.fn2 = this.nada;
    this.alertDecide(head, subh, msg);
  }

  async alertar(head, subHead, parm) {
    if (head === undefined) {
      head = 'Atenção';
    }
    if (subHead === undefined) {
      subHead = '';
    }
    const alert = await this.alertController.create({
      header: head,
      subHeader: subHead,
      message: parm,
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertDecide(head, subHead, parm) {
    const alert = await this.alertController.create({
      header: head,
      subHeader: subHead,
      message: parm,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.fn();
          }
        },
        {
          text: 'Não',
          handler: () => {
            this.fn2();
          }
        }
      ]
    });
    await alert.present();
  }

  goApaga = () => {
    this.api.excluiProduto(this.idProd).then(reg => this.retornoApaga(reg));
  }

  retornoApaga = (data) => {
    if (data.retorno === 'Ok') {
      this.chamaProdutos();
    } else {
      const head = 'Atenção';
      const subh = 'Exclusão de produto';
      const msg = data.retorno;
      this.alertar(head, subh, msg);
    }
  }

  pube = (id) => {
    const produto = this.storageService.getJsonByCampo(this.produtos, 'id', id);
    if (produto.preco === 0) {
      const head = 'Atenção';
      const subh = 'Publicação de produto';
      const msg = 'Não pode publicar um produto com preço zerado';
      this.alertar(head, subh, msg);
      this.chamaProdutos();
    } else {
      let msg='Confirma intenção de publicar o produto ?';
      this.publicando = 1;
      if (produto.publicado === 1) {
        msg = 'Confirma intenção de remover a publicação do produto ?';
        this.publicando = 0;
      }
      this.idProd = id;
      console.log('Produto ' + id + ': ' + msg);
      const head = 'Atenção';
      const subh = 'Decisão';
      this.fn = this.publicar;
      this.fn2 = this.chamaProdutos();
      this.alertDecide(head, subh, msg);
    }
  }

  publicar = () => {
    console.log('Publicar');
    this.fn2 = this.chamaProdutos();
    this.api.alteraPublicacao(this.idProd, this.publicando).then(ret => this.pubAlterado(ret));
  }

  pubAlterado = (data) => {
    console.log(data);
    this.chamaProdutos();
  }

  editaTipo = (id) => {
    console.log('Editando tipo ' + id);
    this.openModalTipo();
  }

  editaProd = (id) => {
    this.storageService.setItemProd(this.item);
    let pr: Produto = this.storageService.getJsonByCampo(this.item.produtos, 'id', id);
    this.storageService.setStProd(pr);
    this.openModalEdita();
  }

  async openModalEdita() {
    const modal = await this.modalCtrl.create({
      component: ModalprodutoeditPage
    });
    modal.onDidDismiss().then(() => {
      this.storageService.getEstabelecimento().then((reg) => this.gotStab(reg));
    });
    return await modal.present();
  }

  async openModalOrdenar() {
    const modal = await this.modalCtrl.create({
      component: ProdutosordertipoPage
    });
    modal.onDidDismiss().then(() => {
      this.storageService.getEstabelecimento().then((reg) => this.gotStab(reg));
    });
    return await modal.present();
  }

  nada = () => {
    
  }

  refresh = () => {
    this.cdRef.detectChanges();
  }

  goVoltar = () => {
    this.idxPagina--;
    this.trazProdutos();
  }
  goAdiante = () => {
    this.idxPagina++;
    this.trazProdutos();
  }

  async openModal() {
    this.storageService.setItemProd(this.item);
    const modal = await this.modalCtrl.create({
      component: ModalprodutosPage
    });
    modal.onDidDismiss().then((data) => {
      console.log('Veio do produto com:');
      const agir = data.data;
      console.log(agir);
      if (agir) {
        this.idxPagina = 0;
      }
      this.storageService.getEstabelecimento().then((reg) => this.gotStab(reg));
    });
    return await modal.present();
  }

  async openModalCardapioPadrao() {
    const modal = await this.modalCtrl.create({
      component: CardapiopadraoPage
    });
    modal.onDidDismiss().then((data) => {
      this.storageService.getEstabelecimento().then((reg) => this.gotStab(reg));
    });
    return await modal.present();
  }

  async openModalPreco() {
    const modal = await this.modalCtrl.create({
      component: ModalprecoprodutoPage
    });
    modal.onDidDismiss().then((data) => {
      this.storageService.getEstabelecimento().then((reg) => this.gotStab(reg));
    });
    return await modal.present();
  }

  async openModalTipo() {
    this.storageService.setItemTipoProduto(this.item);
    const modal = await this.modalCtrl.create({
      component: ModalprodutotipoPage
    });
    modal.onDidDismiss().then((data) => {
      this.storageService.getEstabelecimento().then((reg) => this.gotStab(reg));
    });
    return await modal.present();
  }

  async meioAMeio() {
    const modal = await this.modalCtrl.create({
      component: MeioAMeioPage
    });
    modal.onDidDismiss().then((data) => {
      this.storageService.getEstabelecimento().then((reg) => this.gotStab(reg));
    });
    return await modal.present();
  }
}
