import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { FormatServices } from '../services/formatService';
import { ApiServices } from '../services/apiServices';
import { StorageService, RegistroUsuario } from '../services/storage.service';

declare  global {
  interface String {
    gentNum(): string;
    numGent(): string;
  }
}
@Component({
  selector: 'app-cadastro-basico',
  templateUrl: './cadastro-basico.page.html',
  styleUrls: ['./cadastro-basico.page.scss'],
})
export class CadastroBasicoPage implements OnInit {

  public tRazao: string;
  public tFantasia: string;
  public tCnpj: string;
  public tEmail: string;
  public tNome: string;
  private user: RegistroUsuario;

  constructor(private nav: NavController,
              public formatar: FormatServices,
              public alertController: AlertController,
              private api: ApiServices,
              public storageService: StorageService) {
                console.log('Parâmetros do servidor setados');
                String.prototype.gentNum = function() {
                  const parm = this;
                  let retorno = parm;
                  if (parm.length > 9) {
                      retorno = parm.substring(6, 10) + '-' + parm.substring(3, 5) + '-' + parm.substring(0, 2);
                  }
                  return retorno;
              };
              }

  ngOnInit() {
    this.api.getCab();
  }

  cadastrarBasico = () => {
    let ok = true;
    if (this.tRazao === undefined) {
      this.alertar('Atenção', 'inconsistência', 'Informe a razão social');
      document.getElementById('tRazao').focus();
      ok = false;
    }
    if (ok) {
      if (this.tRazao === '') {
        this.alertar('Atenção', 'inconsistência', 'Informe a razão social');
        document.getElementById('tRazao').focus();
        ok = false;
      }
    }
    if (ok) {
      if (this.tFantasia === undefined) {
        this.alertar('Atenção', 'inconsistência', 'Informe o nome fantasia');
        document.getElementById('tFantasia').focus();
        ok = false;
      }
    }
    if (ok) {
      if (this.tFantasia === '') {
        this.alertar('Atenção', 'inconsistência', 'Informe o nome fantasia');
        document.getElementById('tFantasia').focus();
        ok = false;
      }
    }
    if (ok) {
      if (this.tEmail === undefined) {
        this.alertar('Atenção', 'inconsistência', 'Informe o seu e-mail');
        document.getElementById('tEmail').focus();
        ok = false;
      }
    }
    if (ok) {
      if (this.tEmail === '') {
        this.alertar('Atenção', 'inconsistência', 'Informe o seu e-mail');
        document.getElementById('tEmail').focus();
        ok = false;
      }
    }
    if (ok) {
      if (this.tNome === undefined) {
        this.alertar('Atenção', 'inconsistência', 'Informe o seu nome');
        document.getElementById('tNome').focus();
        ok = false;
      }
    }
    if (this.tCnpj === undefined) {
      this.tCnpj = '';
    }
    if (ok) {
      this.api.checaLogin(this.tEmail, '', '').then((resposta) => this.trataVerificacao(resposta));
    }
  }

  trataVerificacao = (data) => {
    if (data.resposta !== 'Ok') {
      this.alertar('Atenção', 'Erro!', data.resposta);
    } else {
      this.user = {
        email: this.tEmail,
        login: '',
        senha: '',
        flow: 'email unico',
        nome: this.tNome,
        id: 0,
        idPerfil: 0,
        ddd: 0,
        fone: '',
        verificada: 'Nok',
        razao: this.tRazao,
        fantasia: this.tFantasia,
        cnpj: this.tCnpj
      };
      this.storageService.limpaRegUser();
      this.storageService.salvaRegistroUser(this.user);
      this.storageService.setRegUser(this.user);
      this.api.gravaNovoDono(this.user).then((resposta) => this.checaGravouDono(resposta));
    }
  }

  checaGravouDono = (data) => {
    console.log(data);
    let ok = true;
    if (data.id === undefined) {
      console.log(data);
      const head = 'Atenção';
      const subh = 'Erro!';
      const msg = 'Falha gravando estabelecimento';
      this.alertar(head, subh, msg);
      ok = false;
    }
    if (ok) {
      if (data.id === '0') {
        console.log(data);
        const head = 'Atenção';
        const subh = 'Erro!';
        const msg = 'Falha gravando estabelecimento';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      const flow = this.user.flow;
      const verificada = this.user.verificada;
      const cnpj = this.user.cnpj;
      console.log(this.user);
      this.user = data;
      this.user.flow = flow;
      this.user.verificada = verificada;
      this.user.cnpj = cnpj;
      this.storageService.setRegUser(this.user);
      this.api.geraToken(this.user.id).then((resposta) => this.trataEnvio(resposta));
    }
    console.log(this.user);
  }

  trataEnvio = (data) => {
    if (data.resposta !== 'Ok') {
      const head = 'Atenção';
      const subHead = 'retorno envio seu token';
      const msg = `O envio do token gerou uma cocrrência:<br>` + data.resposta;
      this.alertar(head, subHead, msg);
    } else {
      this.user.flow = 'token enviado';
      this.storageService.setRegUser(this.user);
      this.storageService.limpaRegUser();
      this.storageService.salvaRegistroUser(this.user);
      this.nav.navigateRoot('/cadastro-verifica-email', { animated: true, animationDirection: 'forward' });
    }
  }

  confirmarEmail = () => {
    this.nav.navigateRoot('/cadastro-verifica-email', { animated: true, animationDirection: 'forward' });
  }

  formata = (idElemento: string) => {
    this.formatar.mascaraCnpj(idElemento);
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

  testeEquipe = () => {
    const stab = '16';
    this.api.getEquipe(stab);
  }
}
