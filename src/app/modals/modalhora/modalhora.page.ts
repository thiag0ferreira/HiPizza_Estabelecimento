import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiServices } from 'src/app/services/apiServices';
import { StorageService } from 'src/app/services/storage.service';

interface Horario {
  idStab: number;
  hora1: number;
  minuto1: number;
  hora2: number;
  minuto2: number;
  dias: string;
}
interface Horas {
  hora: number;
}
interface Minutos {
  minuto: number;
}
interface Semana {
  dia: string;
}

@Component({
  selector: 'app-modalhora',
  templateUrl: './modalhora.page.html',
  styleUrls: ['./modalhora.page.scss'],
})
export class ModalhoraPage implements OnInit {

  public hora: Horario;
  public horas: Horas[];
  public minutos: Minutos[];
  public semana: Semana[];

  public sHora: number;
  public sMinuto: number;
  public sHora2: number;
  public sMinuto2: number;
  public sDia: string;
  private stab: any;

  constructor(private modalCtrl: ModalController,
              private alertController: AlertController,
              private storageService: StorageService,
              private api: ApiServices) { }

  ngOnInit() {
    console.log('inicializando vars...');
    this.horas = this.populaHoras();
    console.log('Horas postas');
    this.minutos = this.populaMinutos();
    this.semana = this.populaSemana();
    this.stab = this.storageService.getStab();
    console.log(this.stab);
  }

  populaHoras = () => {
    const horas = [];
    for (let i = 0; i < 24; i++) {
      const linha = JSON.parse('{"hora":' + i + '}');
      horas[horas.length] = linha;
    }
    return horas;
  }

  populaMinutos = () => {
    const minutos = [];
    for (let i = 0; i < 60; i+=10) {
      const linha = JSON.parse('{"minuto":' + i + '}');
      minutos[minutos.length] = linha;
    }
    return minutos;
  }

  populaSemana = () => {
    const dias = ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo', 'feriado'];
    const semana = [];
    for (const dia of dias) {
      const linha = JSON.parse('{"dia":"' + dia + '"}');
      semana[semana.length] = linha;
    }
    return semana;
  }

  getIdDia = (nomeDia: string) => {

    switch (nomeDia) {
      case 'segunda': {
        return 1;
      }
      case 'terça': {
        return 2;
      }
      case 'quarta': {
        return 3;
      }
      case 'quinta': {
        return 4;
      }
      case 'sexta': {
        return 5;
      }
      case 'sábado': {
        return 6;
      }
      case 'domingo': {
        return 7;
      }
      case 'feriado': {
        return 8;
      }
      default: {
        return 9;
      }
    }
  }

  gravaHorario = () => {
    let ok = true;
    const hora1 = this.sHora;
    const minuto1 = this.sMinuto;
    const hora2 = this.sHora2;
    const minuto2 = this.sMinuto2;
    const diaSemana = this.sDia;
    const head = 'Atenção';
    const subh = 'validação';
    if (this.sDia === undefined) {
      const msg = 'Informe o dia da semana';
      this.alertar(head, subh, msg);
      ok = false;
    }
    if (ok) {
      if (this.sHora === undefined) {
        const msg = 'Informe a hora do início de atendimento';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.sMinuto === undefined) {
        const msg = 'Informe os minutos do início de atendimento';
        this.alertar(head, subh , msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.sHora2 === undefined) {
        const msg = 'Informe a hora do término de atendimento';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.sMinuto2 === undefined) {
        const msg = 'Informe os minutos do término de atendimento';
        this.alertar(head, subh , msg);
        ok = false;
      }
    }
    if (ok) {
      const nDia = this.getIdDia(diaSemana);
      const idStab = this.stab.id;
      this.hora = {
        idStab,
        minuto1,
        hora1,
        hora2,
        minuto2,
        dias: diaSemana
      };
      this.api.putHorario(this.hora).then(ret => this.putHorario(ret));
    }
  }

  putHorario = (data) => {
    if (data.retorno === 'Ok') {
      this.closeModal();
    } else {
      const header = 'Atenção';
      const subh = 'Erro!';
      const msg = data.retorno;
      this.alertar(header, subh, msg);
    }
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
