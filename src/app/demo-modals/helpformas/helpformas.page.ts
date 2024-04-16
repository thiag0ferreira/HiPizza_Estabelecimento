import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-helpformas',
  templateUrl: './helpformas.page.html',
  styleUrls: ['./helpformas.page.scss'],
})
export class HelpformasPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }
}
