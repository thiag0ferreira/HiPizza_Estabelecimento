import { Component, OnInit } from '@angular/core';
import { StorageService, RegistroUsuario, RegistroEstabelecimento} from '../../services/storage.service';
import { ModalController } from '@ionic/angular';
import { FormatServices } from '../../services/formatService';
import { AlertController } from '@ionic/angular';
import { ApiServices } from '../../services/apiServices';

@Component({
  selector: 'app-modalestabelecimento',
  templateUrl: './modalestabelecimento.page.html',
  styleUrls: ['./modalestabelecimento.page.scss'],
})
export class ModalestabelecimentoPage implements OnInit {

  public campoEdit: string;
  public campoEditF: string;
  public translate: any;
  public stab: RegistroEstabelecimento;
  public nomStab: string;
  public valor: any;
  public isFone: boolean;
  public isNormal: boolean;
  public isCnpj: boolean;
  public user: RegistroUsuario;

  constructor(private storageService: StorageService,
              private modalCtrl: ModalController,
              public formatService: FormatServices,
              public alertController: AlertController,
              private api: ApiServices) { }

  ngOnInit() {
    this.setTranslate();
    this.campoEdit = this.storageService.getCampoEdit();
    this.isFone = false;
    this.isNormal = true;
    this.isCnpj = false;
    if (this.campoEdit === 'fonContato') {
      this.isFone = true;
      this.isNormal = false;
      this.isCnpj = false;
    }
    if (this.campoEdit === 'cnpj') {
      this.isFone = false;
      this.isNormal = false;
      this.isCnpj = true;
    }
    this.storageService.getEstabelecimento().then((resposta) => this.gotStab(resposta));
  }

  gotStab = (stab) => {
    this.stab = stab;
    console.log('Modal Estabelecimento: ');
    console.log(this.stab);
    this.campoEditF = this.getAtribs(this.campoEdit).apresenta;
    const campo = this.getAtribs(this.campoEdit).campo;
    this.nomStab = stab.razaoSocial;
    this.valor = stab[campo];
    if (this.valor === 'null') {
      this.valor = '';
    }
    console.log('Valor: ' + this.valor);
    this.storageService.getUser().then((reg) => this.user = reg[0]);
  }

  setTranslate = () => {
    const mj = [];
    mj[0] = JSON.parse('{"chave":"fantasia","apresenta":"Nome Fantasia","campo":"fantasia"}');
    mj[1] = JSON.parse('{"chave":"razao","apresenta":"Razão Social","campo":"razaoSocial"}');
    mj[2] = JSON.parse('{"chave":"site","apresenta":"Web site","campo":"website"}');
    mj[3] = JSON.parse('{"chave":"email","apresenta":"E-mail","campo":"emailContato"}');
    mj[4] = JSON.parse('{"chave":"contato","apresenta":"Contato","campo":"contatoEmpresa"}');
    mj[5] = JSON.parse('{"chave":"cargo","apresenta":"Cargo","campo":"cargoContato"}');
    mj[6] = JSON.parse('{"chave":"depto","apresenta":"Departamento","campo":"deptoContato"}');
    mj[7] = JSON.parse('{"chave":"fonContato","apresenta":"Fone","campo":"fone"}');
    mj[8] = JSON.parse('{"chave":"cnpj","apresenta":"CNPJ","campo":"cnpj"}');
    mj[9] = JSON.parse('{"chave":"ie","apresenta":"Inscrição Estadual","campo":"ie"}');
    this.translate = mj;
  }

  alteraStab = () => {
    let ok = true;
    const head = 'Atenção';
    let subh = 'insonsistência';
    if (this.valor === undefined) {
      const msg = 'Preencha um valor';
      this.alertar(head, subh, msg);
      ok = false;
    }
    if (ok) {
      if (this.valor === '') {
        const msg = 'Preencha um valor';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      const msg = 'Vou alterar o conteudo de ' + this.campoEdit + ' com o valor de ' + this.valor;
      this.api.alteraEstabelecimento(this.campoEdit, this.valor, this.stab.id)
      .then((resposta) => this.trazAlteracoes(resposta));
      subh = 'Sucesso"';
      // this.alertar(head, subh, msg);
    }
  }
  
  trazAlteracoes = (data) => {
    console.log(data.retorno);
    this.api.getEstabelecimento(this.stab.id).then((reg) => this.setStabs(reg));
  }
  
  setStabs = (data) => {
    this.stab = data;
    this.storageService.salvaEstabelecimento(this.stab).then((resposta) => console.log(resposta));
    this.closeModal();
  }

  getAtribs = (chave) => {
    return this.storageService.getJsonByCampo(this.translate, 'chave', chave);
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  formata = (idElemento, qTipo) => {
    this.formatService.mascaraFone(idElemento, qTipo);
  }

  formataCnpj = (idElemento: string) => {
    this.formatService.mascaraCnpj(idElemento);
  }

  async alertar(head, subHead, parm) {
    if (head === undefined) {
      head = 'Atenção';
    }
    if (subHead === undefined) {
      subHead = '';
    }
    const alert = await this.alertController.create({
      header: head,
      subHeader: subHead,
      message: parm,
      buttons: ['OK']
    });

    await alert.present();
  }
}
