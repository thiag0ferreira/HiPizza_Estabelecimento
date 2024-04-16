import { Component, OnInit } from '@angular/core';
import { ApiServices } from '../services/apiServices';
import { StorageService, RegistroEnderecoEstabelecimento } from '../services/storage.service';
import { ModalController, AlertController } from '@ionic/angular';
import { FormatServices } from '../services/formatService';


@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.page.html',
  styleUrls: ['./endereco.page.scss'],
})
export class EnderecoPage implements OnInit {

  public idStab;
  public stab: any;
  public razaoSocial: string;
  public ender: RegistroEnderecoEstabelecimento = {
    bairro: '',
    cep: '',
    cidade: '',
    complemento: '',
    coordenadas: '',
    estado: '',
    id: 0,
    logradouro: '',
    numero: '',
    referencia: '',
    idEstabelecimento: '',
    tipoLogradouro: '',
    distanciaAtendida: 0
  };
  public nome: string;
  public logradouro: string;
  public numero: string;
  public bairro: string;
  public cidade: string;
  public estados: any;
  public estado: string;
  public referencia: string;
  public complemento: string;
  public raio: number;

  public edLog = false;
  public edNum = false;
  public edBai = false;
  public edCid = false;
  public edEst = false;
  public edRef = false;
  public edCom = false;
  public edRai = false;

  constructor(private api: ApiServices,
              private storageService: StorageService,
              public modalCtrl: ModalController,
              public alertController: AlertController,
              private formatService: FormatServices) { }

  ngOnInit() {
    const ufs = this.storageService.getEstados();
    this.estados = this.getUfs(ufs);
    this.storageService.getEstabelecimento().then((reg) => this.gotStab(reg));
    console.log('Endereço');
    this.nome = 'Asdrubal';
  }
  getUfs = (data) => {
    return data.ufs;
  }

  gotStab = (data) => {
    this.idStab = data.id;
    this.stab = data;
    this.razaoSocial = data.razaoSocial;
    this.api.reCall(this.getEndStab);
    this.api.getCab();
  }

  getEndStab = () => {
    this.api.getEndereco(this.idStab).then(reg => this.gotEnder(reg));
  }

  gotEnder = (data) => {
    console.log(data);
    if (data.id !== null) {
      this.ender = {
        bairro: data.bairro,
        cep: data.cep,
        cidade: data.cidade,
        complemento: data.complemento,
        coordenadas: '',
        estado: data.estado,
        id: data.id,
        logradouro: data.logradouro,
        numero: data.numero,
        referencia: data.referencia,
        idEstabelecimento: '',
        tipoLogradouro: '',
        distanciaAtendida: data.distanciaAtendida
      };
      this.bairro = this.ender.bairro;
      this.cidade = this.ender.cidade;
      this.estado = this.ender.estado;
      this.logradouro = this.ender.logradouro;
      this.numero = this.ender.numero;
      this.referencia = this.ender.referencia;
      this.complemento = this.ender.complemento;
      this.raio = this.ender.distanciaAtendida;
    }
  }

  alteraEnd = (tal) => {
    if (tal === 'tLogradouro') {
      this.logradouro = this.ender.logradouro;
      this.mudaLog();
    }
    if (tal === 'tNumero') {
      this.numero = this.ender.numero;
      this.mudaNum();
    }
    if (tal === 'tBairro') {
      this.bairro = this.ender.bairro;
      this.mudaBai();
    }
    if (tal === 'tCidade') {
      this.cidade = this.ender.cidade;
      this.mudaCid();
    }
    if (tal === 'tEstado') {
      this.estado = this.ender.estado;
      this.mudaEst();
    }
    if (tal === 'tReferencia') {
      this.referencia = this.ender.referencia;
      this.mudaRef();
    }
    if (tal === 'tComplemento') {
      this.complemento = this.ender.complemento;
      this.mudaCom();
    }
    if (tal === 'tRaio') {
      this.raio = this.ender.distanciaAtendida;
      this.mudaRaio();
    }
  }

  formataCep = (id) => {
    this.formatService.mascaracep(id);
  }

  buscaCep = () => {
    let ok = true;
    const head = 'Atenção';
    const subh = 'Pesquisa de CEP';
    if (this.ender.cep === undefined) {
      const msg = 'Informe o  CEP';
      this.alertar(head, subh, msg);
      ok = false;
    }
    if (ok) {
      if (this.ender.cep === '') {
        const msg = 'Informe o  CEP';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.ender.cep.length !== 9) {
        const msg = 'Informe o CEP no formato 9999-99';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      this.api.getByCep(this.ender.cep).then(reg => this.gotCep(reg));
    }
  }
  gotCep = (data) => {
    if (data.resultado === '1') {
      const n = data.logradouro.indexOf(' - ');
      if (n > 0) {
        data.logradouro = data.logradouro.substring(0, n);
      }
      data.logradouro = data.tp_logradouro + ' ' + data.logradouro;
      this.ender.bairro = data.bairro;
      this.ender.cidade = data.cidade;
      this.ender.estado = data.estado;
      this.ender.logradouro = data.logradouro;
      this.bairro = data.bairro;
      this.cidade = this.ender.cidade;
      this.estado = this.ender.estado;
      this.logradouro = this.ender.logradouro;
    } else {
      const head = 'Atenção';
      const subh = 'Gravação de Endereço';
      const msg = 'Endereço não localizado';
      this.alertar(head, subh, msg);
    }
  }

  mudaLog = () => {
    if (!this.edLog) {
      this.logradouro = this.ender.logradouro;
    } else {
      this.ender.logradouro = this.logradouro;
    }
    this.edLog = !this.edLog;
  }

  mudaNum = () => {
    if (!this.edNum) {
      this.numero = this.ender.numero;
    } else {
      this.ender.numero = this.numero;
    }
    this.edNum = !this.edNum;
  }

  mudaBai = () => {
    if (!this.edBai) {
      this.bairro = this.ender.bairro;
    } else {
      this.ender.bairro = this.bairro;
    }
    this.edBai = !this.edBai;
  }

  mudaCid = () => {
    if (!this.edCid) {
      this.cidade = this.ender.cidade;
    } else {
      this.ender.cidade = this.cidade;
    }
    this.edCid = !this.edCid;
  }

  mudaEst = () => {
    if (!this.edEst) {
      this.estado = this.ender.estado;
    } else {
      this.ender.estado = this.estado;
    }
    this.edEst = !this.edEst;
  }

  mudaRef = () => {
    if (!this.edRef) {
      this.referencia = this.ender.referencia;
    } else {
      this.ender.referencia = this.referencia;
    }
    this.edRef = !this.edRef;
  }

  mudaCom = () => {
    if (!this.edCom) {
      this.complemento = this.ender.complemento;
    } else {
      this.ender.complemento = this.complemento;
    }
    this.edCom = !this.edCom;
  }

  mudaRaio = () => {
    if (!this.edRai) {
      this.raio = this.ender.distanciaAtendida;
    } else {
      this.ender.distanciaAtendida = this.raio;
    }
    this.edRai = !this.edRai;
  }

  gravaEnd = () => {
    let ok = true;
    const head = 'Atenção';
    const subh = 'Gravação de Endereço';
    if (this.ender.cep === undefined) {
      const msg = 'Informe o CEP';
      this.alertar(head, subh, msg);
      ok = false;
    }
    if (ok) {
      if (this.ender.cep === '') {
        const msg = 'Informe o CEP';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.ender.logradouro === undefined) {
        const msg = 'Informe o Logradouro';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.ender.logradouro === '') {
        const msg = 'Informe o Logradouro';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.ender.numero === undefined) {
        const msg = 'Informe o número';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.ender.numero === '') {
        const msg = 'Informe o número';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.ender.bairro === undefined) {
        const msg = 'Informe o bairro';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.ender.bairro === '') {
        const msg = 'Informe o bairro';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.ender.cidade === undefined) {
        const msg = 'Informe a cidade';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.ender.cidade === '') {
        const msg = 'Informe a cidade';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.ender.estado === undefined) {
        const msg = 'Escolha um estado';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.ender.estado === '') {
        const msg = 'Escolha um estado';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.ender.referencia === undefined) {
        this.ender.referencia = '';
      }
      this.ender.idEstabelecimento = this.idStab;
      this.ender.complemento = this.complemento;
      this.ender.coordenadas = '';
      this.ender.distanciaAtendida = this.raio; 
      if (this.ender.id === undefined) {
        this.ender.id = 0;
      }
      this.ender.tipoLogradouro = '';
      this.api.gravaEndereco(this.ender).then(reg => this.gravouEndereco(reg));
    }
  }

  gravouEndereco = (data) => {
    console.log(data);
    if (data.id !== undefined) {
      const head = 'Atenção';
      const subh = 'Gravação de Endereço';
      const msg = 'Endereço gravado com sucesso';
      this.alertar(head, subh, msg);
    }
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

  openModal = () => {

  }
}
