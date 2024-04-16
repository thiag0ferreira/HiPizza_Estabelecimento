import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { HelpedidoPage } from '../demo-modals/helpedido/helpedido.page';

@Component({
  selector: 'app-demo-pedidos',
  templateUrl: './demo-pedidos.page.html',
  styleUrls: ['./demo-pedidos.page.scss'],
})
export class DemoPedidosPage implements OnInit {

  public isEntrega = false;
  public grande = false;
  public pequeno = true;

  constructor(private modalCtrl: ModalController,
    private nav: NavController) { }

  ngOnInit() {
    const tam = screen.width;
    if (tam < 768) {
      this.pequeno = true;
      this.grande = false;
    } else {
      this.pequeno = false;
      this.grande = true;
    }

  }

  segmentChanged = (data) => {
    const pagina = data.detail.value;
    if (pagina === 'cadastro') {
      this.nav.navigateRoot('/demo-menu', { animated: true, animationDirection: 'forward' });
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
      component: HelpedidoPage
    });
    modal.onDidDismiss().then((data) => {

    });
    return await modal.present();
  }
}
