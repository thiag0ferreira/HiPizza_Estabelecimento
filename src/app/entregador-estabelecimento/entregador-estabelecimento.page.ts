import { Component, OnInit } from '@angular/core';
import { ApiServices } from '../services/apiServices';
import { StorageService, Entregador, StabEntregador } from '../services/storage.service';

@Component({
  selector: 'app-entregador-estabelecimento',
  templateUrl: './entregador-estabelecimento.page.html',
  styleUrls: ['./entregador-estabelecimento.page.scss'],
})
export class EntregadorEstabelecimentoPage implements OnInit {

  public entregador: Entregador;
  public estabelecimento: StabEntregador;

  constructor(private storageService: StorageService,
    private api: ApiServices) { }

  ngOnInit() {
    console.log('entregador-estabelecimento');
    this.api.reCall(this.getEntregador);
    this.api.getCab();
  }
  
  getEntregador = () => {
    const idEntregador = this.storageService.getIdReg();
    this.api.buscaEntregadorPorId(idEntregador).then(res => this.gotEntregador(res));
  }

  gotEntregador = (res) => {
    console.log(res);
    this.entregador = res;
    this.api.getStabEntregador(this.entregador.idStab).then(res => this.gotStab(res));
  }

  gotStab = (res) => {
    console.log(res);
    this.estabelecimento = res;
    const strEntr = JSON.stringify(this.entregador);
    const strStab = JSON.stringify(this.estabelecimento);
    window.localStorage.setItem('entDados', strEntr);
    window.localStorage.setItem('entrStab', strStab);
  }
}
