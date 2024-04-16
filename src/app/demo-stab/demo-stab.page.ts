import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { HelphorariosPage } from '../demo-modals/helphorarios/helphorarios.page';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-demo-stab',
  templateUrl: './demo-stab.page.html',
  styleUrls: ['./demo-stab.page.scss'],
})
export class DemoStabPage implements OnInit {

  constructor(private modalCtrl: ModalController,
    private storageService: StorageService,
    private nav: NavController) { }

  ngOnInit() {
  }

  segmentChanged = (data) => {
    const pagina = data.detail.value;
    if (pagina === 'cadastro') {
      // this.nav.navigateRoot('/menu', { animated: true, animationDirection: 'forward' });
    }
    if (pagina === 'welcome') {
      this.nav.navigateRoot('/welcome', { animated: true, animationDirection: 'forward' });
    }
    if (pagina === 'pedido') {
      this.nav.navigateRoot('/demo-pedidos', { animated: true, animationDirection: 'forward' });
    }
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: HelphorariosPage
    });
    modal.onDidDismiss().then((data) => {

    });
    return await modal.present();
  }
}
