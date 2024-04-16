import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { StorageService, Produto, RegistroEstabelecimento } from '../../services/storage.service';
import { ApiServices } from '../../services/apiServices';
import { AlertController } from '@ionic/angular';
import { ModalnovoatribPage } from '../modalnovoatrib/modalnovoatrib.page';

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
  selector: 'app-modalprodutos',
  templateUrl: './modalprodutos.page.html',
  styleUrls: ['./modalprodutos.page.scss'],
})
export class ModalprodutosPage implements OnInit {

  public stab: RegistroEstabelecimento;
  public tipos: any;
  public sTipos: number;
  public categorias: any;
  public sCategorias: number;
  public divisoes: any;
  public sDivisao: number;
  public tNome: string;
  public tDescricao: string;
  public strProd: {
    idStab: number,
    nome: string,
    descricao: string,
    detalhe: string,
    preco: number,
    tipo: {
      id: number,
      nome: string,
      idStab: number
    };
  };
  private item: Item;
  private criouTipo: boolean;
  public nomeTipo: string;

  constructor(private modalCtrl: ModalController,
              private storageService: StorageService,
              private api: ApiServices,
              public alertController: AlertController,
              private nav: NavController) {
              }

  ngOnInit() {
    console.log('Modal produtos');
    this.storageService.getEstabelecimento().then((reg) => this.gotStab(reg));
    this.sTipos = 0;
    this.sCategorias = 0;
    this.sDivisao = 0;
    this.criouTipo = false;
    this.item = this.storageService.getItemProd();
    console.log(this.item);
    if (this.item !== undefined) {
      this.nomeTipo = this.item.tipo.nome;
    }
  }

  gotStab = (data) => {
    this.stab = data;
    console.log('Estabelecimento: ' + this.stab);
    this.api.reCall(this.trtTipo);
    this.api.getCab();
  }


  novoTipo = () => {
    const atribs = {
      titulo: 'Novo Tipo',
      label: 'Novo Tipo',
      txBotao: 'Gravar',
      fn: this.gravaTipo,
      fnTrata: this.trtTipo
    };
    this.storageService.setAtribs(atribs);
    this.openModal();
  }

  trtTipo = () => {

  }

  gravaTipo = (valor) => {
    console.log('Colocar tipo ' + valor + ' para estabelecimento ' + this.stab.id + ' (' + this.stab.fantasia + ')');
    this.api.gravaNovoTipo(valor, this.stab.id).then((reg) => this.retornoGravaTipo(reg));
  }
  retornoGravaTipo = (data) => {
    if (data.retorno === 'Ok') {
      const head = 'Atenção';
      const subh = 'Novo Tipo';
      const msg = 'Gravação realizada com sucesso';
      this.criouTipo = true;
      this.closeModal();
      this.alertar(head, subh, msg);
    } else {
      const head = 'Atenção';
      const subh = 'Novo Tipo';
      const msg = data.retorno;
      this.alertar(head, subh, msg);
    }
  }

  salvaProduto = () => {
    let ok = true;
    if (this.tNome === undefined) {
      const head = 'Atenção';
      const subh = 'validação';
      const msg = 'Informe o nome do produto';
      this.alertar(head, subh, msg);
      ok = false;
    }
    if (ok) {
      if (this.tNome === '') {
        const head = 'Atenção';
        const subh = 'validação';
        const msg = 'Informe o nome do produto';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.tDescricao === undefined) {
        this.tDescricao = '';
      }
    }
    if (ok) {
      this.strProd = {
        nome: this.tNome,
        descricao: this.tNome,
        detalhe: this.tDescricao,
        idStab: this.stab.id,
        preco: 0,
        tipo: {
          id: this.item.tipo.id,
          nome: "",
          idStab: this.stab.id
        }
      };
      this.api.gravaNovoProduto(this.strProd).then(reg => this.produtoGravou(reg));
    }
  }

  produtoGravou = (data) => {
    console.log(data);
    if (data.retorno === 'Ok') {
      // this.nav.navigateRoot('/produtos', { animated: true, animationDirection: 'forward' });
      this.closeModal();
    } else {
      const head = 'Atenção';
      const subh = 'validação';
      const msg = data.retorno;
      this.alertar(head, subh, msg);
    }
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalnovoatribPage
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
    });
    return await modal.present();
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

  async closeModal() {
    await this.modalCtrl.dismiss(this.criouTipo);
  }
}
