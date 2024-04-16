import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-helpnavega',
  templateUrl: './helpnavega.page.html',
  styleUrls: ['./helpnavega.page.scss'],
})
export class HelpnavegaPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }
}
