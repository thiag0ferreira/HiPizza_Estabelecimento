import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-helpendereco',
  templateUrl: './helpendereco.page.html',
  styleUrls: ['./helpendereco.page.scss'],
})
export class HelpenderecoPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }
}
