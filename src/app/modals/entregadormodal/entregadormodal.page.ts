import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiServices } from 'src/app/services/apiServices';
import { StorageService, Pedidos } from 'src/app/services/storage.service';

interface Perfil {
  id: number,
  nome: string;
}

interface Pessoa {
  pelido: string,
  ddd: string,
  email: string,
  fone: string,
  id: number,
  nasc: string,
  nome: string,
  okBusca: string,
  perfil: Perfil,
  sexo: string
}

@Component({
  selector: 'app-entregadormodal',
  templateUrl: './entregadormodal.page.html',
  styleUrls: ['./entregadormodal.page.scss'],
})
export class EntregadormodalPage implements OnInit {

  public pedido: Pedidos;
  public pessoas: Pessoa[];
  public pessoa: Pessoa;
  public entregadores: Pessoa[];

  public noPedido: number;
  public nomeCliente: string;
  public endCliente: string;
  public endLocal: string;
  public endBairro: string;
  public endCep: string;

  public nomeEntregador: string;

  constructor(private modalCtrl: ModalController,
    private api: ApiServices,
    private storageService: StorageService,
    private alertController: AlertController,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.api.reCall(this.trazPedido);
    this.api.getCab();
  }

  trazPedido = () => {
    this.pedido = this.storageService.getPedido();
    this.noPedido = this.pedido.id;
    this.nomeCliente = this.pedido.cliente.nome;
    let endereco = this.pedido.cliente.endLogradouro + ', ' + this.pedido.cliente.endNumero;
    if (this.pedido.cliente.endComplemento !== null) {
      endereco += ' - ' + this.pedido.cliente.endComplemento;
    }
    this.endCliente = endereco;
    this.endLocal = this.pedido.cliente.endCidade + '-' + this.pedido.cliente.endEstado;
    this.api.getEquipe(this.pedido.idEstabelecimento).then(ret =>this.gotEquipe(ret));
    this.endBairro = this.pedido.cliente.endBairro;
    this.endCep = this.pedido.cliente.endCep;

    this.nomeEntregador = 'Não definido';
    if (this.pedido.ipEquipe2 !== null) {
      if (this.pedido.ipEquipe2.nome !== '')
      this.nomeEntregador = this.pedido.ipEquipe2.nome;
    }
  }

  gotEquipe = (data) => {
    let ok = false;
    let entregadores: Pessoa[];
    this.pessoas = data.content;
    this.pessoas.forEach(pes => {
      if (pes.perfil.nome === 'Entregador') {
        ok = true;
        if (entregadores === undefined) {
          entregadores = [pes];
        } else {
          entregadores[entregadores.length] = pes;
        }
      }
    });
    this.entregadores = entregadores;
    if (!ok) {
      const head = 'Atenção';
      const subh = 'Equipe';
      const msg = 'Você não tem entregadores cadastrados na sua equipe';
      this.alertar(head, subh, msg);
    }
  }

  setEntregador = (idEntregador) => {
    console.log('Gravar entregador ' + idEntregador);
    this.api.setEntregador(this.pedido.id, idEntregador).then(ret => this.potEntregador(ret));
  }

  potEntregador = (data) => {
    console.log(data);
    this.api.buscaPedidoPorId(this.pedido.id).then(ret => this.gotPedido(ret));
  }

  gotPedido = (data) => {
    this.pedido = data;
    this.storageService.setPedido(this.pedido);
    this.trazPedido();
    this.cdRef.detectChanges();
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
