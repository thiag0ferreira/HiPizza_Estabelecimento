import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { FormatServices } from '../../services/formatService';
import { StorageService } from '../../services/storage.service';
import { ApiServices } from '../../services/apiServices';

declare  global {
  interface String {
    toMoeda(): string;
    correnciaParaFloat(): string;
  }
}
@Component({
  selector: 'app-modalprecoproduto',
  templateUrl: './modalprecoproduto.page.html',
  styleUrls: ['./modalprecoproduto.page.scss'],
})
export class ModalprecoprodutoPage implements OnInit {

  public produto: any;
  public tipo: string;
  public nome: string;
  public descricao: string;
  public tPreco: any;

  constructor(public alertController: AlertController,
              private nav: NavController,
              private modalCtrl: ModalController,
              private formatService: FormatServices,
              private storageService: StorageService,
              private api: ApiServices) {
                String.prototype.toMoeda = function() {
                  const num = this;
                  const retorno = formatService.float2moeda(num);
                  return retorno;
                };
                String.prototype.correnciaParaFloat = function() {
                  const parm = this;
                  const retorno = formatService.correnciaParaFloat(parm);
                  return retorno;
                };
              }

  ngOnInit() {
    console.log('modal');
    this.produto = this.storageService.getStProd();
    console.log(this.produto);
    this.tipo = this.produto.tipo.nome;
    this.nome = this.produto.nome;
    this.descricao = this.produto.descricao;
    this.tPreco = this.produto.preco.toString().toMoeda();
  }

  mascaraMoeda = (idElemento) => {
    this.formatService.mascaraMoeda(idElemento);
  }

  alteraPreco = () => {
    const preco = this.tPreco.toString().correnciaParaFloat();
    const pre = parseFloat(preco);
    const parms = {
      id: this.produto.id,
      preco: pre
    };
    this.api.alteraPreco(parms).then(reg => this.retAltera(reg));
  }
  retAltera = (data) => {
    if (data.retorno === 'Ok') {
      const head = 'Atenção';
      const subh = 'Alteração de Preço';
      const msg = 'Alteração realizada com sucesso';
      this.alertar(head, subh, msg);
      // this.nav.navigateRoot('/produtos', { animated: true, animationDirection: 'forward' });
      this.closeModal();
    } else {
      const head = 'Atenção';
      const subh = 'Alteração de Preço';
      const msg = data.retorno;
      this.alertar(head, subh, msg);
    }
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
    await this.modalCtrl.dismiss();
  }
}
