import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HelpenderecoPage } from '../demo-modals/helpendereco/helpendereco.page';

@Component({
  selector: 'app-demo-endereco',
  templateUrl: './demo-endereco.page.html',
  styleUrls: ['./demo-endereco.page.scss'],
})
export class DemoEnderecoPage implements OnInit {

  public edCom = false;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: HelpenderecoPage
    });
    modal.onDidDismiss().then((data) => {

    });
    return await modal.present();
  }
}
