import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-helpequipe',
  templateUrl: './helpequipe.page.html',
  styleUrls: ['./helpequipe.page.scss'],
})
export class HelpequipePage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }
}
