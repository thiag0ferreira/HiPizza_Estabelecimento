import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiServices } from 'src/app/services/apiServices';
import { StorageService } from 'src/app/services/storage.service';
import { IonReorderGroup } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/core';

interface Tipo {
  id: number,
  nome: string,
  idStab: number
}

@Component({
  selector: 'app-produtosordertipo',
  templateUrl: './produtosordertipo.page.html',
  styleUrls: ['./produtosordertipo.page.scss'],
})
export class ProdutosordertipoPage implements OnInit {

  private idStab: number;
  public tipos: Tipo[];
  items = [];

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor(private modalCtrl: ModalController,
    private storageService: StorageService,
    private api: ApiServices) { }

  ngOnInit() {
    this.storageService.getEstabelecimento().then((reg) => this.pegouStab(reg));
  }

  pegouStab = (data) => {
    this.idStab = data.id;
    console.log('Data:');
    console.log(data);
    console.log('id: ' + this.idStab);
    this.api.reCall(this.getTipos);
    this.api.getCab();
  }

  getTipos = () => {
    console.log('Buscando tipos de estabelecimento ' + this.idStab);
    this.api.getTiposDeStab(this.idStab).then(reg => this.gotTipos(reg));
  }

  gotTipos = (data) => {
    console.log(data);
    this.tipos = data;
    this.tipos.forEach(tipo => {
      this.items.push(tipo.id);
    });
  }

  doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    console.log('Before complete', this.items);
    this.items = ev.detail.complete(this.items);
    console.log('After complete', this.items);
    this.api.reordenacaoDeTipos(this.items.toString()).then(reg => this.reordenado(reg));
  }

  reordenado = (data) => {
    const retorno = data.retorno;
    console.log(retorno);
    this.getTipos();
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }
}
