import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService, RegistroEnderecoEstabelecimento } from '../../services/storage.service';

@Component({
  selector: 'app-modalnovoatrib',
  templateUrl: './modalnovoatrib.page.html',
  styleUrls: ['./modalnovoatrib.page.scss'],
})
export class ModalnovoatribPage implements OnInit {

  public titulo: string;
  public label: string;
  public txBotao: string;
  public fn: any;
  public tratal: any;
  public atribs: any;
  public valor: string;
  public dica: string;
  private stab: RegistroEnderecoEstabelecimento;

  constructor(private modalCtrl: ModalController,
              private storageService: StorageService) { }

  ngOnInit() {
    this.atribs = this.storageService.getAatribs();
    this.titulo = this.atribs.titulo;
    this.label = this.atribs.label;
    this.txBotao = this.atribs.txBotao;
    this.fn = this.atribs.fn;
    this.tratal = this.atribs.fnTrata;
    console.log('modalatribs');
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  processa = () => {
    this.atribs.fn(this.valor);
  }

  trata = () => {
    this.atribs.fnTrata(this.valor);
  }
}
