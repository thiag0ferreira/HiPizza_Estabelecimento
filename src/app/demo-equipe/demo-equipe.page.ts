import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HelpequipePage } from '../demo-modals/helpequipe/helpequipe.page';

@Component({
  selector: 'app-demo-equipe',
  templateUrl: './demo-equipe.page.html',
  styleUrls: ['./demo-equipe.page.scss'],
})
export class DemoEquipePage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: HelpequipePage
    });
    modal.onDidDismiss().then((data) => {

    });
    return await modal.present();
  }
}
