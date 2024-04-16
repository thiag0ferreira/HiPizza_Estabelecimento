import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiServices } from 'src/app/services/apiServices';
import { StorageService, Pedidos, Produto, Opcoes, Item } from 'src/app/services/storage.service';
import { EntregadormodalPage } from '../entregadormodal/entregadormodal.page';
import { PedidosclientemodalPage } from '../pedidosclientemodal/pedidosclientemodal.page';

@Component({
  selector: 'app-modalpedido',
  templateUrl: './modalpedido.page.html',
  styleUrls: ['./modalpedido.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalpedidoPage implements OnInit {

  public pedido: Pedidos;

  constructor(private modalCtrl: ModalController,
    private storageService: StorageService,
    private api: ApiServices,
    private cdRef:ChangeDetectorRef) { }

  ngOnInit() {
    this.api.reCall(this.getCliente);
    this.pedido = this.storageService.getPedido();
    if (this.pedido.cliente.endComplemento === 'null') {
      this.pedido.cliente.endComplemento = '';
    } else {
      this.pedido.cliente.endComplemento = ' - ' + this.pedido.cliente.endComplemento;
    }
    if (this.pedido.cliente.endReferencia === 'null') {
      this.pedido.cliente.endReferencia = '';
    }
    console.log(this.pedido);
    this.api.getCab();
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
 }

  goControle = () => {
    this.openModal();
  }

  gotPedido = (data) => {
    this.storageService.setPedido(data);
    this.pedido = data;
    console.log('Trouxe, recarregar: Obs cliente: ' + this.pedido.cliente.obs);
    this.cdRef.detectChanges();
    if (this.pedido.nomeStatus === 'Entregando') {
      this.openModalEntregador();
      if (this.pedido.ipEquipe2 == null) {
        console.log('Aqui abrir modal entregador');
      }
    }
  }

  async openModal() {
    this.storageService.setRefresca(0);
    const modal = await this.modalCtrl.create({
      component: PedidosclientemodalPage
    });
    modal.onDidDismiss().then((data) => {
      console.log('Fechando modal...')
      if (this.storageService.getRefresca() === 1) {
        console.log('Reabre refrescando');
        this.storageService.setRefresca(0);
        this.cdRef.detectChanges();
      } else {
        console.log('Traz pedido sem refrescsr ao fechar modal');
        this.api.buscaPedidoPorId(this.pedido.id).then(ped => this.gotPedido(ped));
      }
    });
    return await modal.present();
  }

  async openModalEntregador() {
    const modal = await this.modalCtrl.create({
      component: EntregadormodalPage
    });
    return await modal.present();
  }

  getCliente = () => {
    // this.api.getClienteBYid(this.pedido.)
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }}
