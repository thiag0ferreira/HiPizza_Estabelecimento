import { Component, OnInit } from '@angular/core';
import { ApiServices } from 'src/app/services/apiServices';
import { StorageService, Pedidos } from 'src/app/services/storage.service';
import { AlertController, ModalController } from '@ionic/angular';


interface Flags {
  id: number,
  nome: string,
  alerta: number,
  marcada: number,
  bol: boolean
}

@Component({
  selector: 'app-pedidoclienteflagsmodal',
  templateUrl: './pedidoclienteflagsmodal.page.html',
  styleUrls: ['./pedidoclienteflagsmodal.page.scss'],
})
export class PedidoclienteflagsmodalPage implements OnInit {

  public pedNo: string;
  public nomeStatus: string;
  public pedido: Pedidos;
  public flagsCliente: Flags[];
  public flags: Flags[];
  private flag: Flags;

  constructor(private storageService: StorageService,
    private api: ApiServices,
    private modalCtrl: ModalController,
    private alertController: AlertController) { }

  ngOnInit() {
    this.api.reCall(this.getPedido);
    this.api.getCab();
  }

  getPedido = () => {
    this.pedido = this.storageService.getPedido();
    this.pedNo = this.pedido.id.toString();
    this.nomeStatus = this.pedido.nomeStatus;
    this.getFlagsCliente();
  }

  getFlagsCliente = () => {
    this.api.getFlagsDeCliente(this.pedido.cliente.id).then(ret => this.gotFlagsCliente(ret));
  }
  
  gotFlagsCliente = (data) => {
    this.flagsCliente = data;
    this.getListaFlags();
  }

  getListaFlags = () => {
    this.api.getListaFlagsClientes().then(ret => this.gotFlags(ret));
  }

  gotFlags = (data) => {
    this.flags = data;
    console.log('Flags:');
    console.log(this.flags);
    this.marcaFlags();
  }

  marcaFlags = () => {
    let flagsDoCliente = this.getFlagsClientes();
    console.log(flagsDoCliente);
    for (let f of this.flags) {
      console.log('f');
      console.log(f);
      const id = f.id;
      const fCliente = this.storageService.getJsonByCampo(flagsDoCliente, 'id', id);
      f.marcada = 0;
      f.bol = false;
      if (fCliente !== '') {
        f.marcada = 1;
        f.bol = true;
      }
    }
    console.log('Resultado tratamento:');
    console.log(this.flags);
  }

  marca = (id) => {
    let flagsDoCliente = this.getFlagsClientes();
    const idCliente = this.pedido.cliente.id;
    const fCliente = this.storageService.getJsonByCampo(flagsDoCliente, 'id', id);
    if (fCliente !== '') {
      console.log('Marcar ' + id);
      this.retiraFlag(idCliente, id);
    } else {
      console.log('Desmarcar ' + id);
      this.addFlag(idCliente, id);
    }
    this.flag = this.storageService.getJsonByCampo(this.flags, 'id', id);
    console.log(this.flag);
  }

  retiraFlag = (idCliente: number, idFlag: number) => {
    this.api.retiraFlagCliente(idCliente, idFlag).then(ret => this.tratouFlag(ret));
  }

  addFlag = (idCliente: number, idFlag: number) => {
    this.api.addFlagCliente(idCliente, idFlag).then(ret => this.tratouFlag(ret));
  }

  tratouFlag = (data) => {
    if (data.retorno !== 'Ok') {
      const head = 'Atenção';
      const subh = 'Erro!';
      this.alertar(head, subh, data.retorno);
    } else {
      console.log('Alterou');
      this.storageService.setRefresca(1);
      this.closeModal();
    }
  }

  getFlagsClientes = () => {
    let flagsDoCliente = Array();
    for (let cFlag of this.flagsCliente) {
      let flc = {};
      flc = {"id": this.getIdFlag(cFlag)};
      flagsDoCliente[flagsDoCliente.length] = flc;
    }
    return flagsDoCliente;
  }

  getIdFlag = (parm) => {
    return parm.flag.id;
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
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
}
