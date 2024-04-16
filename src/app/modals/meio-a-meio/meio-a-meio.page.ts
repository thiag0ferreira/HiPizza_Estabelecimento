import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiServices } from 'src/app/services/apiServices';
import { RegistroEstabelecimento, StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-meio-a-meio',
  templateUrl: './meio-a-meio.page.html',
  styleUrls: ['./meio-a-meio.page.scss'],
})
export class MeioAMeioPage implements OnInit {

  public metade: string;
  private stab: RegistroEstabelecimento;

  constructor(private modalCtrl: ModalController,
    private storageService: StorageService,
    private api: ApiServices,
    private alertController: AlertController) { }

  ngOnInit() {
    console.log('meioameio');
    this.metade = 'cara';
    this.stab = this.storageService.getStab();
    if (this.stab.meioameio === '') {
      this.metade = 'cara';
    } else {
      this.metade = this.stab.meioameio;
    }
    this.api.reCall(this.nada);
    this.api.getCab();
  }

  nada = () => {

  }

  salvaMeio = () => {
    console.log('salva ' + this.metade);
    this.api.setFormulaMeioAMeio(this.stab.id, this.metade).then(res => this.meioSalvo(res));
  }

  meioSalvo = (res) => {
    const head = 'Atenção';
    let subh = 'Gravação';
    let msg = 'Gravação realizada com sucesso';
    if (res.retorno !== 'Ok') {
      subh = 'Erro!';
      msg = res.retorno;
    } else {
      this.stab.meioameio = this.metade;
      this.storageService.setStab(this.stab);
    }
    this.alertar(head, subh, msg);
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
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
}
