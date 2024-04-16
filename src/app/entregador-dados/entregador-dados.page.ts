import { Component, OnInit } from '@angular/core';
import { StorageService, Entregador } from '../services/storage.service';

@Component({
  selector: 'app-entregador-dados',
  templateUrl: './entregador-dados.page.html',
  styleUrls: ['./entregador-dados.page.scss'],
})
export class EntregadorDadosPage implements OnInit {

  public entregador: Entregador;

  constructor(private storageService: StorageService) {
    String.prototype.numGent = function() {
      const parm = this;
      let retorno = parm;
      if (parm.length > 9) {
          retorno = parm.substring(8, 10) + '/' + parm.substring(5, 7) + '/' + parm.substring(0, 4);
      }
      return retorno;
    };
   }

  ngOnInit() {
    const strEntr = window.localStorage.getItem('entDados');
    this.entregador = JSON.parse(strEntr);
    if (this.entregador.nasc !== null) {
      const dt = this.entregador.nasc.numGent();
      this.entregador.nasc = dt;
    }
  }

}
