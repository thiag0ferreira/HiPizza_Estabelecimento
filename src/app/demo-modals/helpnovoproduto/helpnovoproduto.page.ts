import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-helpnovoproduto',
  templateUrl: './helpnovoproduto.page.html',
  styleUrls: ['./helpnovoproduto.page.scss'],
})
export class HelpnovoprodutoPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }
}
