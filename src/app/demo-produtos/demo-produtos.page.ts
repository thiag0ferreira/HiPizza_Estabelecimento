import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HelpnavegaPage } from '../demo-modals/helpnavega/helpnavega.page';
import { HelpnovoprodutoPage } from '../demo-modals/helpnovoproduto/helpnovoproduto.page';

@Component({
  selector: 'app-demo-produtos',
  templateUrl: './demo-produtos.page.html',
  styleUrls: ['./demo-produtos.page.scss'],
})
export class DemoProdutosPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: HelpnavegaPage
    });
    modal.onDidDismiss().then((data) => {

    });
    return await modal.present();
  }

  async openModalProd() {
    const modal = await this.modalCtrl.create({
      component: HelpnovoprodutoPage
    });
    modal.onDidDismiss().then((data) => {

    });
    return await modal.present();
  }
}
