import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiServices } from '../services/apiServices';
import { StorageService, StabEntregador, Entregador } from '../services/storage.service';

@Component({
  selector: 'app-antendente-entregadores',
  templateUrl: './antendente-entregadores.page.html',
  styleUrls: ['./antendente-entregadores.page.scss'],
})
export class AntendenteEntregadoresPage implements OnInit {

  private estabelecimento: StabEntregador;
  public entregadores: Entregador[];
  public grande = false;
  public pequeno = true;

  constructor(private storageService: StorageService,
    private api: ApiServices,
    private nav: NavController) { }

  ngOnInit() {
    console.log('atendente - entregadores');
    const tam = screen.width;
    if (tam < 768) {
      this.pequeno = true;
      this.grande = false;
    } else {
      this.pequeno = false;
      this.grande = true;
    }
    const strStab = window.localStorage.getItem('entrStab');
    this.estabelecimento = JSON.parse(strStab);
    this.api.reCall(this.trazListaEntregadores);
    this.api.getCab();
  }

  trazListaEntregadores = () => {
    this.api.trazListaEntregadores(this.estabelecimento.id).then(res => this.trouxeEntregadores(res));
  }

  trouxeEntregadores = (res) => {
    console.log(res);
    this.entregadores = res;
  }

  pegoEntregador = (id) => {
    const entregador: Entregador = this.entregadores.find(e => e.id == id);
    const strEntregador = JSON.stringify(entregador);
    window.localStorage.setItem('gotEntre', strEntregador);
    this.nav.navigateRoot('/atendente-trabalha-entregador', { animated: true, animationDirection: 'forward' });
  }

}
