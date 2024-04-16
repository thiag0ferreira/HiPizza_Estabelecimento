import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-helpedido',
  templateUrl: './helpedido.page.html',
  styleUrls: ['./helpedido.page.scss'],
})
export class HelpedidoPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }
}
