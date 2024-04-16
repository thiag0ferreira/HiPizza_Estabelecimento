import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { EntregadormodalPage } from '../modals/entregadormodal/entregadormodal.page';
import { ModalpedidoPage } from '../modals/modalpedido/modalpedido.page';
import { ApiServices } from '../services/apiServices';
import { StorageService, RegistroEstabelecimento, Pedidos, Item, Produto, Opcoes, Equipe, Metades } from '../services/storage.service';


declare  global {
  interface String {
    numGent(): string;
    formatMoeda(): string;
  }
}

interface Formas {
  id: number,
  nome: string
}


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PedidosPage implements OnInit {

  public stab: RegistroEstabelecimento;
  public pedidos: Pedidos[];
  private pedido: Pedidos;
  public pdSelecionados: Pedidos[];
  private conta: number;
  private contaItens: number;
  private formas: Formas[];
  public itens: Item[];
  private item: Item;
  private produto: Produto;
  private opcoes: Opcoes[];
  public metades: Metades[];
  private metade: Metades;

  public pequeno: boolean;
  public grande: boolean;
  private contItem: number;
  private lRef: number;
  private mods: number;
  private vai = true;

  public cor1 = 'background-color: aliceblue;';
  public cor2 = 'background-color: floralwhite';
  public fCor: string;
  private qCor: number;
  private doLoading = true;
  public selFiltros;
  public equipe: Equipe;
  private contaMetades: number;

  constructor(private storageService: StorageService,
          private api: ApiServices,
          private nav: NavController,
          public modalCtrl: ModalController,
          private cdRef:ChangeDetectorRef,
          public loadingController: LoadingController,
          private alertController: AlertController) {

            String.prototype.numGent = function() {
              const parm = this;
              let retorno = parm;
              if (parm.length > 9) {
                  retorno = parm.substring(8, 10) + '/' + parm.substring(5, 7) + '/' + parm.substring(0, 4);
                  retorno += ' ';
                  retorno += parm.substring(11,19);
              }
              return retorno;
            };
            String.prototype.formatMoeda = function() {
              const parm = this;
              let num = parseFloat(parm);
              let x = 0;

              if (num < 0) {
                  num = Math.abs(num);
                  x = 1;
              }
              if (isNaN(num)) {
                  num = 0;
              }
              const cents = Math.floor((num * 100 + 0.5) % 100);
              let centa = cents.toString();
              num = Math.floor((num * 100 + 0.5) / 100);
              if (cents < 10) {
                  centa = '0' + centa;
              }
              let numa = num.toString();
              for (let i = 0; i < Math.floor((numa.length - (1 + i)) / 3); i++) {
                  numa = numa.substring(0, numa.length - (4 * i + 3)) + '.'
                    + numa.substring(numa.length - (4 * i + 3));
              }
              let ret = numa+ ',' + centa;
              if (x === 1) {
                  ret = ' - ' + ret;
              }
              return ret;
            };
          }

  ngOnInit() {
    console.log('pedidos');
    if (this.doLoading) {
      this.presentLoading();
    }
    this.doLoading = true;
    if (this.selFiltros === undefined) {
      this.selFiltros = Array();
      this.selFiltros[0] = 'Colocado';
    }
    this.contItem = 0;
    this.mods = 0;
    this.lRef = 20;
    this.qCor = 1;
    this.api.reCall(this.getPedidos);
    this.api.getCab();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      // cssClass: 'my-custom-class',
      message: 'Crregando pedidos...',
      duration: 8000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    this.cdRef.detectChanges();
  }

  ngAfterViewInit() {
    // this.cdRef.detectChanges();
  }

  getPedidos = () => {
    this.stab = this.storageService.getStab();
    if (this.stab === undefined) {
      this.storageService.getEstabelecimento().then(ret => this.gotStab(ret));
    } else {
      this.api.getPedidoStab(this.stab.id).then(regs => this.gotPedidos(regs));
    }
  }

  gotStab = (data) => {
    if (data === null) {
      this.doLoading = false;
      const head = 'Atenção';
      const subh = 'Navegar';
      const msg = 'Vemos que você ainda não se cadastrou. Agora você deve decidir se deseja se cadastrar ou navegar em modo demonstração';
      this.alertDesvia(head, subh, msg);
      try {
        this.loadingController.dismiss();
      } catch (e) {
        
      }
    } else {
      this.stab = data;
      this.api.getPedidoStab(this.stab.id).then(regs => this.gotPedidos(regs));
    }
  }

  removeDados = () => {
    this.storageService.limpaRegUser();
    this.storageService.limpaRegHip();
  }

  async alertDesvia(head, subHead, parm) {
    const alert = await this.alertController.create({
      header: head,
      subHeader: subHead,
      message: parm,
      buttons: [
        {
          text: 'Quero me cadastrar',
          handler: () => {
            this.cadastroBasico();
          }
        },
        {
          text: 'Navegar em demonstração',
          handler: () => {
            this.goAquarioCadastro();
          }
        },
        {
          text: 'Limpar cadastro',
          handler: () => {
            this.removeDados();
          }
        }
      ]
    });
    return await alert.present();
  }

  goAquarioCadastro = () => {
    this.nav.navigateRoot('/demo-menu', { animated: true, animationDirection: 'forward' });
  }
  
  cadastroBasico = () => {
    this.nav.navigateRoot('/cadastro-basico', { animated: true, animationDirection: 'forward' });
  }

  gotPedidos = (data) => {
    this.pedidos = data.content;
    let fc = 1;
    this.pedidos.forEach(pedido => {
      pedido.dataHora = pedido.dataHora.numGent();
      pedido['strTotal'] = pedido.total.toString().formatMoeda();
      if (pedido.obsTroco !== null && pedido.obsTroco !== '') {
        pedido.obsTroco = 'Troco para ' + pedido.obsTroco;
      }
      if (fc === 1) {
        pedido.cor = this.cor1;
        fc = 2;
      } else {
        pedido.cor = this.cor2;
        fc = 1;
      }
    });
    console.log(this.pedidos);
    this.conta = 0;
    this.getFormas();
  }

  getFormas = () => {
    if (this.pedidos.length > this.conta) {
      this.pedido = this.pedidos[this.conta];
      this.api.getFormasPgPd(this.pedido.id).then(regs => this.gotFormas(regs));
    } else {
      this.conta = 0;
      this.getItens();
    }
  }

  gotFormas = (data) => {
    this.formas = data;
    let txFormas = '';
    this.formas.forEach(forma => {
      txFormas += forma.nome + ' ';
    });
    this.pedido.formas = txFormas;
    if (this.pedido.formas.trim() !== 'Dinheiro') {
      this.pedido.obsTroco = '';
    }
    this.pedido.isEntrega = false;
    this.pedido.entregador = '';
    if (this.pedido.nomeStatus === 'Entregando') {
      this.pedido.isEntrega = true;
      if (this.pedido.ipEquipe2 !== null) {
        this.pedido.entregador = this.pedido.ipEquipe2.nome;
        if (this.pedido.entregador === '') {
          this.pedido.entregador = 'Não definido';
        }
      } else {
        this.pedido.entregador = 'Não definido';
      }
    }

    this.conta++;
    this.getFormas();
  }

  getItens = () => {
    if (this.pedidos.length > this.conta) {
      this.pedido = this.pedidos[this.conta];
      this.api.getItensPedido(this.pedido.id).then(regs => this.gotItens(regs));
    } else {
      // this.cdRef.detectChanges();
      try {
        this.loadingController.dismiss();
      } catch(e){}
      // this.aplicaFiltros();
      this.conta = 0;
      this.setMetades();
    }
  }

  gotItens = (data) => {
    this.itens = data;
    const metades: Item[] = this.itens.filter(i => i.idMetade2 != 0);
    const simples: Item[] = this.itens.filter(i => i.idMetade2 == 0);
    this.pedido.itens = simples;
    this.pedido['metades'] = metades;
    this.itens = simples;
    this.contaItens = 0;
    this.varreItens();
  }

  mudouFiltro = (parm) => {
    console.log(parm);
    const valores = parm.detail.value;
    console.log('Valores:');
    console.log(valores);
    this.aplicaFiltros();
  }

  aplicaFiltros = () => {
    let gotPeds: Pedidos[];
    let fc = 1;
    if (this.selFiltros.length > 0) {
      this.pedidos.forEach(p => {
        for (let i=0; i< this.selFiltros.length; i++) {
          const status: string = this.selFiltros[i];
          if (p.nomeStatus.toLowerCase() === status.toLowerCase()) {
            if (fc === 1) {
              p.cor = this.cor1;
              fc = 2;
            } else {
              p.cor = this.cor2;
              fc = 1;
            }
            console.log('Colocando pedido ' + p.id + ', ' + p.nomeStatus);
            if (gotPeds === undefined) {
              gotPeds = [p];
            } else {
              gotPeds[gotPeds.length] = p;
            }
          }
        }
      });
    }
    this.pdSelecionados = gotPeds;
    this.cdRef.detectChanges();
  }

  varreItens = () => {
    if (this.itens.length > this.contaItens) {
      this.item = this.itens[this.contaItens];
      const total = this.item.qtd * this.item.valor;
      const tTotal = total.toString().formatMoeda();
      this.item.total = tTotal;
      this.api.getProdutoPorId(this.item.idProduto).then(prd => this.gotProduto(prd));
    } else {
      this.pedido.itens = this.itens;
      this.conta++;
      this.getItens();
    }
  }

  setMetades = () => {
    if (this.pedidos.length > this.conta) {
      this.pedido = this.pedidos[this.conta];
      this.contaMetades = 0;
      this.varreMetades();
    } else {
      this.aplicaFiltros();
    }
  }

  varreMetades = () => {
    if (this.pedido['metades'].length > this.contaMetades) {
      let metade: Item = this.pedido['metades'][this.contaMetades];
      this.api.getProdutoPorId(metade.idMetade2).then(res => this.setAtributosMetade(res));
    } else {
      this.conta++;
      this.setMetades();
    }
  }

  setAtributosMetade = (res) => {
    const pr: Produto = this.varToPrd(res);
    let metade: Item = this.pedido['metades'][this.contaMetades];
    metade['detalhe2'] = pr.detalhe;
    metade['descricao2'] = pr.descricao;
    this.pedido['metades'][this.contaMetades] = metade;
    this.varreProdutoMetade();
  }

  varreProdutoMetade = () => {
    let metade: Item = this.pedido['metades'][this.contaMetades];
    this.api.getProdutoPorId(metade.idProduto).then(res => this.setAtributosMetadePrd(res));
  }

  setAtributosMetadePrd = (res) => {
    const pr: Produto = this.varToPrd(res);
    let metade: Item = this.pedido['metades'][this.contaMetades];
    metade['detalhe1'] = pr.detalhe;
    metade['descricao1'] = pr.descricao;
    this.pedido['metades'][this.contaMetades] = metade;
    this.contaMetades++;
    this.varreMetades();
  }

  varToPrd = (res) => {
    const p: Produto = res;
    return p;
  }

  gotProduto = (data) => {
    this.produto = data;
    this.item.produto = this.produto;
    this.getOpcoes();
  }
  
  getOpcoes = () => {
    this.api.getOpcoesDeItem(this.item.id).then(ops => this.gotOpcoes(ops));
  }
  
  gotOpcoes = (data) => {
    this.opcoes = data;
    this.item.opcoes = this.opcoes;
    this.contaItens++;
    this.varreItens();
  }

  detalha = (id) => {
    this.pedido = this.storageService.getJsonByCampo(this.pedidos, 'id', id);
    this.storageService.setPedido(this.pedido);
  }

  goMenu = () => {
    this.nav.navigateRoot('/menu', { animated: true, animationDirection: 'forward' });
  }

  lastou = (bol) => {
    // console.log('lastou');
    if (bol) {
      this.doAcerto();
    }
  }

  clientePedido = (id) => {
    console.log(id);
    this.pedido = this.storageService.getJsonByCampo(this.pedidos, 'id', id);
    this.storageService.setPedido(this.pedido);
    this.openModal();
  }

  doAcerto = () => {
    const tam = screen.width;
    if (tam < 768) {
      this.pequeno = true;
      this.grande = false;
    } else {
      this.pequeno = false;
      this.grande = true;
    }
    this.mods++;
    if (this.mods < this.lRef) {
      // this.cdRef.detectChanges();
    }
  }

  gotPrdidoPorId = (data) => {
    this.storageService.setPedido(data);
    this.doLoading = false;
    this.ngOnInit();
  }

  lastCont = () => {
    this.contItem++;
    if (this.contItem === this.pedidos.length) {
      console.log('Refrescar');
      // this.cdRef.detectChanges();
      this.doAcerto();
    }
  }

  segmentChanged = (data) => {
    const pagina = data.detail.value;
    if (this.vai) {
      if (pagina === 'cadastro') {
        this.nav.navigateRoot('/menu', { animated: true, animationDirection: 'forward' });
      }
      if (pagina === 'welcome') {
        this.nav.navigateRoot('/welcome', { animated: true, animationDirection: 'forward' });
      }
      if (pagina === 'pedido') {
        this.nav.navigateRoot('/home', { animated: true, animationDirection: 'forward' });
      }
    } else {
      this.vai = true;
    }
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalpedidoPage
    });
    modal.onDidDismiss().then((data) => {
      if (this.storageService.getRefresca() === 1) {
        this.storageService.setRefresca(0);
        //this.openModal();
      }
      this.api.buscaPedidoPorId(this.pedido.id).then(ret => this.gotPrdidoPorId(ret));
      this.cdRef.detectChanges();
    });
    return await modal.present();
  }

  abreModalEntregador = (idPedido) => {
    this.pedido = this.storageService.getJsonByCampo(this.pedidos, 'id', idPedido);
    this.storageService.setPedido(this.pedido);
    this.openModalEntregador();
  }

  async openModalEntregador() {
    const modal = await this.modalCtrl.create({
      component: EntregadormodalPage
    });
    modal.onDidDismiss().then((data) => {
      if (this.storageService.getRefresca() === 1) {
        this.storageService.setRefresca(0);
        //this.openModal();
      }
      this.api.buscaPedidoPorId(this.pedido.id).then(ret => this.gotPrdidoPorId(ret));
      this.cdRef.detectChanges();
    });
    return await modal.present();
  }
}
