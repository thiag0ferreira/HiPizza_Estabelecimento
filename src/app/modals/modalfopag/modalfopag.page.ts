import { Component, OnInit } from '@angular/core';
import { ApiServices } from 'src/app/services/apiServices';
import { StorageService, RegistroEstabelecimento } from 'src/app/services/storage.service';
import { AlertController, ModalController } from '@ionic/angular';

interface Formas {
  id: number;
  nome: string;
}

@Component({
  selector: 'app-modalfopag',
  templateUrl: './modalfopag.page.html',
  styleUrls: ['./modalfopag.page.scss'],
})
export class ModalfopagPage implements OnInit {

  public formas: any;
  public formaSelecionada: any;
  public formasStab: Formas[];
  public regStab: RegistroEstabelecimento;

  constructor(private api: ApiServices,
              private storageService: StorageService,
              private modalCtrl: ModalController,
              private alertController: AlertController) { }

  ngOnInit() {
    this.api.reCall(this.getListaFormas);
    this.api.getCab();
  }

  getListaFormas = () => {
    this.formas = this.storageService.getFormas();
    console.log(this.formas);
  }

  poeForma = () => {
    this.formasStab = this.storageService.getFormasStab();
    console.log(this.formaSelecionada);
    let ok = true;
    for (const forma of this.formasStab) {
      if (forma.id.toString() === this.formaSelecionada) {
        ok = false;
      }
    }
    if (ok) {
      this.regStab = this.storageService.getStab();
      console.log('Ok para gravar');
      this.api.gravaFormaPag(this.regStab.id, this.formaSelecionada).then(resp => this.gravada(resp));
    } else {
      const head = 'Atenção';
      const subh = 'Validação';
      const msg = 'O estabelecimento já possui essa forma de pagamento';
      this.alertar(head, subh, msg);
    }
  }

  gravada = (data) => {
    if (data.retorno === 'Ok') {
      this.storageService.setRefresca(1);
      this.closeModal();
    } else {
      const head = 'Atenção';
      const subh = 'Validação';
      const msg = data.retorno;
      this.alertar(head, subh, msg);
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
