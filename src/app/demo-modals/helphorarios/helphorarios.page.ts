import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-helphorarios',
  templateUrl: './helphorarios.page.html',
  styleUrls: ['./helphorarios.page.scss'],
})
export class HelphorariosPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }
}
