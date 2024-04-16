import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HelpformasPage } from '../demo-modals/helpformas/helpformas.page';

@Component({
  selector: 'app-demo-formapaga',
  templateUrl: './demo-formapaga.page.html',
  styleUrls: ['./demo-formapaga.page.scss'],
})
export class DemoFormapagaPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: HelpformasPage
    });
    modal.onDidDismiss().then((data) => {

    });
    return await modal.present();
  }
}
