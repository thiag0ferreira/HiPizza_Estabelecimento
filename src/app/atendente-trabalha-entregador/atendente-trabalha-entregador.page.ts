import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiServices } from '../services/apiServices';
import { Entregador, StorageService, LogEntregador } from '../services/storage.service';

@Component({
  selector: 'app-atendente-trabalha-entregador',
  templateUrl: './atendente-trabalha-entregador.page.html',
  styleUrls: ['./atendente-trabalha-entregador.page.scss'],
})
export class AtendenteTrabalhaEntregadorPage implements OnInit {

  public entregador: Entregador;
  public tNome: string;
  private indice = 0;
  private passo = 5;
  public logsEntrega: LogEntregador[];
  public grande = false;
  public pequeno = true;

  constructor(private storageService: StorageService,
    private api: ApiServices,
    private nav: NavController) { }

  ngOnInit() {
    console.log('Trabalha entregador');
    const tam = screen.width;
    if (tam < 768) {
      this.pequeno = true;
      this.grande = false;
    } else {
      this.pequeno = false;
      this.grande = true;
    }
    const strEntr = window.localStorage.getItem('gotEntre');
    this.entregador = JSON.parse(strEntr);
    this.tNome = this.entregador.nome;
    this.api.reCall(this.getLogs);
    this.api.getCab();
  }

  getLogs = () => {
    this.api.trazLogDePlayer(this.entregador.id, this.indice, this.passo).then(res => this.gotLogs(res));
  }

  gotLogs = (res) => {
    console.log(res);
    this.logsEntrega = res.content;
  }

  goEntregadores = () => {
    this.nav.navigateRoot('/atendente/stab', { animated: true, animationDirection: 'forward' });
  }
}
