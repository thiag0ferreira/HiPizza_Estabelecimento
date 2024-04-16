import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ModalfopagPage } from '../modals/modalfopag/modalfopag.page';
import { ApiServices } from '../services/apiServices';
import { StorageService, RegistroEstabelecimento } from '../services/storage.service';

interface Formas {
  id: number;
  nome: string;
}

@Component({
  selector: 'app-formapaga',
  templateUrl: './formapaga.page.html',
  styleUrls: ['./formapaga.page.scss'],
})
export class FormapagaPage implements OnInit {

  public formas: Formas[];
  public stab: RegistroEstabelecimento;
  public formasStab: Formas[];
  private idForma: number;

  constructor(private api: ApiServices,
              private storageService: StorageService,
              private modalCtrl: ModalController,
              private alertController: AlertController) { }

  ngOnInit() {
    this.api.reCall(this.getFormas);
    this.api.getCab();
  }

  getFormas = () => {
    this.api.getFormasPagamento().then(regs => this.gotFormas(regs));
  }

  gotFormas = (data) => {
    this.formas = data;
    console.log(this.formas);
    this.storageService.setFormas(this.formas);
    this.storageService.getEstabelecimento().then((reg) => this.getFormasStab(reg));
  }

  getFormasStab = (data) => {
    this.stab = data;
    this.storageService.setStab(this.stab);
    this.api.getFormasPgDeStab(this.stab.id).then(regs => this.gotAceitas(regs));
  }

  gotAceitas = (data) => {
    this.formasStab = data;
    this.storageService.setFormasStab(this.formasStab);
    console.log('Formas aceitas pelo estabelecimento: ');
    console.log(this.formasStab);
  }

  terminou = (bol) => {
    if (bol) {
      this.doAcerto();
    }
  }

  doAcerto = () => {
    const tam = screen.width;
    const el = document.getElementById('iLista');
    if (tam < 768) {
      el.style.setProperty('padding-left', '5%');
      el.style.setProperty('padding-right', '5%');
    } else {
      el.style.setProperty('padding-left', '25%');
      el.style.setProperty('padding-right', '25%');
    }
  }

  goReload = () => {
    this.api.getFormasPgDeStab(this.stab.id).then(regs => this.gotAceitas(regs));
  }

  apagaForma = (id) => {
    this.idForma = id;
    const head = 'Atenção';
    const subh = 'Decisão';
    const msg = 'Confirma intenção de apagar o regisgtro ?';
    this.alertDecide(head, subh, msg);
  }

  goApaga = () => {
    this.api.apagaFormaStab(this.stab.id, this.idForma).then(ret => this.tratApaga(ret));
  }

  tratApaga = (data) => {
    if (data.retorno === 'Ok') {
      this.goReload();
    } else {
      const head = 'Atenção';
      const subh = 'Erro!';
      const msg = data.retorno;
      this.alertar(head, subh, msg);
    }
  }

  async alertDecide(head, subHead, parm) {
    const alert = await this.alertController.create({
      header: head,
      subHeader: subHead,
      message: parm,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.goApaga();
          }
        },
        {
          text: 'Não',
          role: 'cancel'
        }
      ]
    });
    return await alert.present();
  }
  /*
  ionViewDidEnter() {
    this.platform.ready().then(() => {
      console.log('Carregou');
      this.doAcerto()
    });
  }
  */

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
  async openModal() {
    this.storageService.setRefresca(0);
    const modal = await this.modalCtrl.create({
      component: ModalfopagPage
    });
    modal.onDidDismiss().then((data) => {
      if (this.storageService.getRefresca() === 1) {
        this.goReload();
      }
    });
    return await modal.present();
  }}
