import { Component, OnInit } from '@angular/core';
import { ApiServices } from '../services/apiServices';
import { StorageService } from '../services/storage.service';
import { ModalController, AlertController } from '@ionic/angular';
import { ModalequipePage } from '../modals/modalequipe/modalequipe.page';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.page.html',
  styleUrls: ['./equipe.page.scss'],
})
export class EquipePage implements OnInit {

  public idStab: number;
  public equipe: any;
  public idPessoa: number;

  constructor(private api: ApiServices,
              private storageService: StorageService,
              public modalCtrl: ModalController,
              public alertController: AlertController) { }

  ngOnInit() {
    this.api.getCab();
    this.storageService.getEstabelecimento().then((reg) => this.getEquipe(reg));
  }

  getEquipe = (data) => {
    const stab = data;
    this.idStab = data.id;
    console.log(stab);
    this.api.getEquipe(this.idStab).then((reg) => this.gotEquipe(reg));
  }

  gotEquipe = (data) => {
    console.log(data);
    this.equipe = data.content;
    console.log(this.equipe);
  }

  novaPessoa = () => {
    this.storageService.setPessoaEquipe(0);
    this.openModal();
  }

  editaEquipe = (id) => {
    console.log('Editando pessoa ' + id);
    this.storageService.setPessoaEquipe(id);
    this.openModal();
  }

  apagaPessoa = (id) => {
    this.idPessoa = id;
    const head = 'Atenção';
    const subh = 'Decisão';
    const msg = 'Confirma intenção de apagar o regisgtro ?';
    this.alertDecide(head, subh, msg);
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

  goApaga = () => {
    this.api.apagaPessoa(this.idPessoa).then((resp) => this.tratApaga(resp));
  }
  tratApaga = (data) => {
    if (data.retorno === 'Ok') {
      history.go(0);
    } else {
      const head = 'Resposta';
      const subh = 'Erro';
      const msg = data.retorno;
      this.alertar(head, subh, msg);
    }
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalequipePage
    });
    modal.onDidDismiss().then((data) => {
      this.api.getEquipe(this.idStab).then((reg) => this.gotEquipe(reg));
    });
    return await modal.present();
  }
}
