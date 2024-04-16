import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiServices } from 'src/app/services/apiServices';
import { StorageService, Pedidos, QuemEstaNavegando } from 'src/app/services/storage.service';

interface Status {
  id: number,
  nome: string,
  bol: boolean
}

@Component({
  selector: 'app-pedidostatusmodal',
  templateUrl: './pedidostatusmodal.page.html',
  styleUrls: ['./pedidostatusmodal.page.scss'],
})
export class PedidostatusmodalPage implements OnInit {

  public status: Status;
  public listaStatus: Status[];
  public pedido: Pedidos;

  public pedNo: number;
  public nomeStatus: string;
  private operadorModel: QuemEstaNavegando;

  constructor(private modalCtrl: ModalController,
    private api: ApiServices,
    private storageService: StorageService,
    private alertController: AlertController,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    console.log('Status Pedido');
    this.operadorModel = this.storageService.getOperador();
    this.api.reCall(this.getStatuses);
    this.api.getCab();
  }

  getStatuses = () => {
    this.api.getListaStatusPedido().then(stt => this.gotStatuses(stt));
  }

  gotStatuses = (data) => {
    console.log(data);
    this.listaStatus = data;
    this.marcaStatus();
  }

  marcaStatus = () => {
    this.pedido = this.storageService.getPedido();
    this.pedNo = this.pedido.id;
    this.nomeStatus = this.pedido.nomeStatus;
    const idStatus = this.pedido.idStatus;
    for (let s of this.listaStatus) {
      s.bol = false;
      if (s.id === idStatus) {
        s.bol = true;
      }
    }
  }

  marca = (idStatus: number) => {
    this.api.setStatusPed(this.pedido.id, idStatus).then(ret => this.marcados(ret));
  }

  marcados = (data) => {
    console.log(data);
    if (data.retorno !== 'Ok') {
      const head = 'Atenção';
      const subh = 'Erro';
      this.alertar(head, subh, data.retorno);
    } else {
      this.api.buscaPedidoPorId(this.pedido.id).then(ret => this.gotPedido(ret));
    }
  }
  
  gotPedido = (data) => {
    this.storageService.setPedido(data);
    console.log('Fazendo refresh...');
    this.marcaStatus();
    this.cdRef.detectChanges();
    /*
    this.storageService.setRefresca(1);
    this.closeModal();
    */
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
