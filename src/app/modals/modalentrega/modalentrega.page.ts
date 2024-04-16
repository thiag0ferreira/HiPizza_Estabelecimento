import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiServices } from 'src/app/services/apiServices';
import { StorageService, Entregador, Entrega } from 'src/app/services/storage.service';

interface EntregaPedido {
  idPedido: number,
  idEntregador: number,
  strStatus: string,
  msgFechamento: string
}

@Component({
  selector: 'app-modalentrega',
  templateUrl: './modalentrega.page.html',
  styleUrls: ['./modalentrega.page.scss'],
})
export class ModalentregaPage implements OnInit {

  public entrega: Entrega;
  public acoes: string[];
  public acaoPedido: string;
  public tObs: string;
  private entregador: Entregador;
  private entregaDto: EntregaPedido;

  constructor(private modalCtrl: ModalController,
    private storageService: StorageService,
    private api: ApiServices) { }

  ngOnInit() {
    console.log('entregas');
    this.entrega = JSON.parse(window.localStorage.getItem('entrega'));
    this.acoes = [];
    this.acoes.push('Pedido Entregue');
    this.acoes.push('Pedido Recusado');
    this.acoes.push('Endereço não localizado');
    this.acoes.push('Cliente não estava');
    this.acoes.push('Outro');
    const strEntr = window.localStorage.getItem('entDados');
    this.entregador = JSON.parse(strEntr);
    const strEntrega = window.localStorage.getItem('entrega');
    this.entrega = JSON.parse(strEntrega);
  }

  concluirPedido = () => {
    console.log('Fechado com conclusão ' + this.acaoPedido);
    console.log('Observações: ' + this.tObs);
    const idEntregador = this.entregador.id;
    const idPedido = this.entrega.id;
    this.entregaDto = {
      idEntregador: idEntregador,
      idPedido: idPedido,
      strStatus: this.acaoPedido,
      msgFechamento: this.tObs
    };

    this.api.reCall(this.salvaPedido);
    this.api.getCab();
  }

  salvaPedido = () => {
    this.api.entregadorRegistraEntrega(this.entregaDto).then(res => this.pedidoSalvo(res));
  }

  pedidoSalvo = (res) => {
    console.log(res);
    if (res.resposta !== 'Ok') {
      alert(res.resposta);
    } else {
      this.closeModal();
    }
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }
}
