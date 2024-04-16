import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiServices } from 'src/app/services/apiServices';
import { StorageService, Produto } from 'src/app/services/storage.service';

interface Tipo {
  id: number,
  nome: string,
  idStab: number,
  aplicaMeioAMeio: string
}

interface Prd extends Produto {
  valor: string,
  pub: boolean
}

interface Item {
  tipo: Tipo;
  produtos: Prd[]
}

@Component({
  selector: 'app-modalprodutotipo',
  templateUrl: './modalprodutotipo.page.html',
  styleUrls: ['./modalprodutotipo.page.scss'],
})
export class ModalprodutotipoPage implements OnInit {

  public nomeTipo: string
  private tipo: Tipo;
  private item: Item;
  private mudou: boolean;
  public meio: string;

  constructor(private modalCtrl: ModalController,
    private storageService: StorageService,
    private alertController: AlertController,
    private api: ApiServices) { }

  ngOnInit() {
    console.log('modalTipoProduto');
    this.item = this.storageService.getItemTipoProduto();
    this.tipo = this.item.tipo;
    this.nomeTipo = this.tipo.nome;
    this.meio = '' + this.tipo.aplicaMeioAMeio;
    this.mudou = false;
  }

  apagaTipo = () => {
    const nRegs = this.item.produtos.length;
    const head = 'Atenção';
    const subh = 'Decisão';
    let msg = 'Confirma intenção de apagar o regisgtro ?';
    if (nRegs > 0) {
      msg = 'Existem ' + nRegs + ' produtos cadastrados sob esse tipo que serão apagados\n' + msg;
    }
    this.alertDecide(head, subh, msg);
  }

  goApaga = () => {
    const idTipo = this.tipo.id;
    this.api.excluiTipo(idTipo).then(reg => this.tipoApagado(reg));
  }

  tipoApagado = (data) => {
    const retorno = data.retorno;
    if (retorno === 'Ok') {
      alert('Tipo Removido');
      this.mudou = true;
      this.closeModal();
    }
  }

  async alertDecide(head, subHead, parm) {
    const alert = await this.alertController.create({
      header: head,
      subHeader: subHead,
      message: parm,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.goApaga();
          }
        },
        {
          text: 'Não',
          role: 'cancel'
        }
      ]
    });
    return await alert.present();
  }

  alteraTipo = () => {
    let ok = true;
    if (this.nomeTipo === undefined) {
      alert("Informe o tipo");
      ok = false;
    }
    if (ok) {
      if (this.nomeTipo === '') {
        alert("Informe o tipo");
        ok = false;
      }
    }
    if (ok) {
      this.api.alteraTipo(this.item.tipo.id, this.nomeTipo, parseInt(this.meio, 10)).then(reg => this.tipoAlterado(reg));
    }
  }

  tipoAlterado = (data) => {
    const retorno = data.retorno;
    if (retorno === 'Ok') {
      alert('Tipo Alterado');
      this.mudou = true;
      this.closeModal();
    }
  }

  async closeModal() {
    await this.modalCtrl.dismiss(this.mudou);
  }
}
