import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalentregaPage } from '../modals/modalentrega/modalentrega.page';
import { ApiServices } from '../services/apiServices';
import { FormatServices } from '../services/formatService';
import { StorageService, Entregador, NomesDto, Entrega } from '../services/storage.service';



@Component({
  selector: 'app-entregador-entregas',
  templateUrl: './entregador-entregas.page.html',
  styleUrls: ['./entregador-entregas.page.scss'],
})
export class EntregadorEntregasPage implements OnInit {

  public entregador: Entregador;
  private nomeProdutos: NomesDto[];
  private nomesFormasPagamento: NomesDto[];
  public entregas: Entrega[];
  public nex: boolean;
  public prv: boolean;
  public pagina: number

  constructor(private storageService: StorageService,
    private api: ApiServices,
    private formate: FormatServices,
    private modalCtrl: ModalController) {
      String.prototype.toMoeda = function() {
        const num = this;
        const retorno = formate.float2moeda(num);
        return retorno;
      };
     }

  ngOnInit() {
    const strEntr = window.localStorage.getItem('entDados');
    this.entregador = JSON.parse(strEntr);
    this.api.reCall(this.getEntregas);
    this.api.getCab();
  }

  getEntregas = () => {
    const idStatus = 6;
    this.api.listaPedidosPorStatusEEntregador(this.entregador.id, idStatus).then(res => this.gotEntregas(res));
  }

  gotEntregas = (res) => {
    console.log(res);
    this.entregas = res.content;
    this.entregas.forEach(entr => {
      entr.totalFormatado = entr.total.toString(10).toMoeda();
      if (entr.obsTroco !== '') {
        entr.obsTroco = 'Troco para ' + entr.obsTroco;
      }
    });
    this.nex = false;
    if (res.last === false) {
      this.nex = true;
    }
    this.prv = false;
    if (res.first === false) {
      this.prv = true;
    }
    this.pagina = res.number;
  }

  goAdiante = () => {
    const idx = this.pagina + 1;
    const url: string = this.getLink(idx);
    this.api.getUrl(url).then(res => this.gotEntregas(res));
  }

  goTras = () => {
    const idx = this.pagina - 1;
    const url: string = this.getLink(idx);
    this.api.getUrl(url).then(res => this.gotEntregas(res));
  }

  getLink = (idx: number) => {
    let link = this.api.getProt() + '/entregadores/listaPedidosPorStatusEEntregador?idEntregador='
     + this.entregador.id + '&idStatus=6&passo=2&pagina=' + idx;
     return link;
  }

  detalha = (id: number) => {
    const entrega = this.entregas.find(e => e.id == id);
    console.log(entrega);
    const strEntr = JSON.stringify(entrega);
    window.localStorage.setItem('entrega', strEntr);
    this.openModal();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalentregaPage
    });
    modal.onDidDismiss().then((data) => {
      this.getEntregas();
    });
    return await modal.present();
  }
}
