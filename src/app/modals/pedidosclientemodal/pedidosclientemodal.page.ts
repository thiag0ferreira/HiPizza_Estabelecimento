import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { ApiServices } from 'src/app/services/apiServices';
import { StorageService, Pedidos } from 'src/app/services/storage.service';
import { PedidoclienteflagsmodalPage } from '../pedidoclienteflagsmodal/pedidoclienteflagsmodal.page';
import { PedidostatusmodalPage } from '../pedidostatusmodal/pedidostatusmodal.page';

interface Flags {
  id: number,
  nome: string,
  alerta: number
}

interface StruUser {
  id: number;
  nome: string;
  apelido: string;
  login: string;
  senha: string;
  idPerfil: number;
  perfil: any;
  email: string;
  obs: string;
  sexo: string;
  verificada: string;
  ddd: number;
  fone: string;
  flow: string;
};

@Component({
  selector: 'app-pedidosclientemodal',
  templateUrl: './pedidosclientemodal.page.html',
  styleUrls: ['./pedidosclientemodal.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PedidosclientemodalPage implements OnInit {

  public pedido: Pedidos;
  public flags: Flags[];

  private mods: number;
  private modRef: number;

  public pedNo: number;
  public pedNome: string;
  public obsCli: string;
  public edObs: boolean;
  public user: StruUser;

  constructor(private modalCtrl: ModalController,
    private storageService: StorageService,
    private api: ApiServices,
    private cdRef:ChangeDetectorRef,
    private nav: NavController,
    private alertController: AlertController) { }

  ngOnInit() {
    this.mods = 0;
    this.modRef = 20;
    this.edObs = false;
    this.api.reCall(this.getPedido);
    this.api.getCab();
  }

  getPedido = () => {
    this.pedido = this.storageService.getPedido();
    this.pedNo = this.pedido.id;
    this.pedNome = this.pedido.nomeStatus;
    this.obsCli = this.pedido.cliente.obs;
    console.log('Eis pedido:');
    this.getFlagsCliente();
  }
  
  getFlagsCliente = () => {
    this.api.getFlagsDeCliente(this.pedido.cliente.id).then(ret => this.gotFlagsCliente(ret));
  }
  
  gotFlagsCliente = (data) => {
    this.flags = data;
    this.cdRef.detectChanges();
    this.getUser();
  }

  flagou = () => {
    // this.doAcerto();
  }

  doAcerto = () => {
    const tam = screen.width;
    const el = document.getElementById('iContent');
    if (tam < 768) {
      el.style.setProperty('padding-left', '5%');
      el.style.setProperty('padding-right', '5%');
    } else {
      el.style.setProperty('padding-left', '25%');
      el.style.setProperty('padding-right', '25%');
    }
    this.mods++;
    if (this.mods < this.modRef) {
      console.log('Detectou mudanças');
      this.cdRef.detectChanges();
    }
  }

  getUser = () => {
    const id: number = this.pedido.cliente.id;
    this.api.getClienteBYid(id).then(cli => this.gotUser(cli));
  }

  gotUser = (data) => {
    this.user = data;
    console.log(this.user);
    if (this.pedido.nomeStatus === 'Entregando') {
      if (this.pedido.ipEquipe2 == null) {
        console.log('Abrir modal entregador');
      }
    }
  }

  goEdObs = () => {
    this.edObs = true;
  }

  alteraObs = () => {
    this.edObs = false;
    console.log("Alterado: " + this.obsCli);
    this.user.obs = this.obsCli;
    this.api.alteraUser(this.user).then(cli => this.alteradoObs(cli));
  }
  
  alteradoObs = (data) => {
    if (data.retorno !== 'Ok') {
      const head = 'Atenção';
      const subh = 'Erro!';
      this.alertar(head, subh, data.retorno);
    }
    // this.storageService.setRefresca(1);
    // this.closeModal();
    this.trazPedido(this.pedido.id);
  }

  trazPedido = (idPedido: number) => {
    this.api.buscaPedidoPorId(idPedido).then(ped => this.gotPedido(ped));
  }

  gotPedido = (data) => {
    this.pedido = data;
    this.storageService.setPedido(data);
    this.ngOnInit();
  }

  async openModal() {
    this.storageService.setRefresca(0);
    const modal = await this.modalCtrl.create({
      component: PedidoclienteflagsmodalPage
    });
    modal.onDidDismiss().then((data) => {
      console.log(this.storageService.getRefresca());
      if (this.storageService.getRefresca() === 1) {
        this.storageService.setRefresca(0);
        this.openModal();
      } else {
        this.trazPedido(this.pedido.id);
      }
    });
    return await modal.present();
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  async openModalStatus() {
    this.storageService.setRefresca(0);
    const modal = await this.modalCtrl.create({
      component: PedidostatusmodalPage
    });
    modal.onDidDismiss().then((data) => {
      console.log(this.storageService.getRefresca());
      if (this.storageService.getRefresca() === 1) {
        console.log('Retorno faz refresh');
        this.storageService.setRefresca(0);
        this.openModalStatus();
      } else {
        console.log('Retorno traz pedido');
        this.ngOnInit();
      }
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
}
