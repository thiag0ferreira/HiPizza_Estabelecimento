import { Component, OnInit } from '@angular/core';
import { StorageService, RegistroUsuario } from '../services/storage.service';
import { FormatServices } from '../services/formatService';
import { NavController, AlertController } from '@ionic/angular';
import { ApiServices } from '../services/apiServices';

@Component({
  selector: 'app-cadastro-verifica-email',
  templateUrl: './cadastro-verifica-email.page.html',
  styleUrls: ['./cadastro-verifica-email.page.scss'],
})
export class CadastroVerificaEmailPage implements OnInit {

  private user: RegistroUsuario;
  public tCelular: string;
  public tToken: string;
  public tLogin: string;
  public tSenha: string;
  public tSenha2: string;
  public razao: string;
  public email: string;
  public nome: string;

  constructor(private storageService: StorageService,
              public formatService: FormatServices,
              private nav: NavController,
              public alertController: AlertController,
              private api: ApiServices) { }

  ngOnInit() {
    this.api.getCab();
    this.user = this.storageService.getRegUser();
    let ok = true;
    if (this.user.email === undefined) {
      ok = false;
    }
    if (ok) {
      if (this.user.email === '') {
        ok = false;
      } else {
        this.razao = this.user.razao;
        this.email = this.user.email;
        this.nome = this.user.nome;
      }
    }
    if (! ok) {
      this.storageService.getUser().then((reg) => this.restoreUser(reg));
    }
    console.log('verif');
  }

  formata = (idElemento, qTipo) => {
    this.formatService.mascaraFone(idElemento, qTipo);
  }

  restoreUser = (reg) => {
    this.user = reg;
    this.razao = this.user.razao;
    this.email = this.user.email;
    this.nome = this.user.nome;
  }

  mudarEmail = () => {

  }

  cadastrarEmail = () => {
    let ok = true;
    const head = 'Atenção';
    const subh = 'inconsistência';
    if (this.tCelular === undefined) {
      const msg = 'Informe o seu celular';
      this.alertar(head, subh, msg);
      ok = false;
    }
    if (ok) {
      if (this.tCelular === '') {
        const msg = 'Informe o seu celular';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.tLogin === undefined) {
        const msg = 'Informe um login';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.tLogin === '') {
        const msg = 'Informe um login';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.tSenha === undefined) {
        const msg = 'Informe uma senha';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.tSenha === '') {
        const msg = 'Informe uma senha';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.tSenha2 === undefined) {
        const msg = 'Confirme a senha';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.tSenha2 === '') {
        const msg = 'Confirme a senha';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.tSenha !== this.tSenha2) {
        const msg = 'As senhas informadas não batem.';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.tToken === undefined) {
        const msg = 'Informe o token recebido';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.tToken === '') {
        const msg = 'Informe o token recebido';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      let ddd = 0;
      let fone = '';
      const separado = this.formatService.separaFone(this.tCelular);
      const partes = separado.split(':');
      ddd = partes[0];
      fone = partes[1];
      if (this.user.id === undefined) {
        this.user = this.user[0];
      }
      this.api.validaTokenGravaEstabelecimento(this.user.id, ddd, fone, this.tLogin,
        this.tSenha, this.tToken, this.user.razao,
        this.user.fantasia, this.user.cnpj).then((resposta) => this.trataValidacao(resposta));
    }
  }

  trataValidacao = (data) => {
    console.log(data);
    if (data.erro === '') {
      if (data.id !== undefined) {
        if (data.idEstabelecimento !== undefined) {
          this.storageService.setIdEstabelecimento(data.idEstabelecimento);
          this.user.flow = 'token validado';
          this.storageService.setRegUser(this.user);
          this.storageService.limpaRegUser();
          this.storageService.salvaRegistroUser(this.user);
          this.api.getEstabelecimento(data.idEstabelecimento).then((reg) => this.goStab(reg));
        }
      }
    } else {
      const head = 'Atenção';
      const subh = 'Erro!';
      const msg = data.erro;
      this.alertar(head, subh, msg);
    }
  }

  goStab = (stab) => {
    this.storageService.setStab(stab);
    this.storageService.salvaEstabelecimento(stab).then((resposta) => this.estabelecimentoSalvo(resposta));
  }

  estabelecimentoSalvo = (data) => {
    console.log('Estabelecimento salvo: ' + data);
    console.log(data);
    this.nav.navigateRoot('/menu', { animated: true, animationDirection: 'forward' });
  }

  goInicio = () => {
    this.api.removeUsuario(this.user.id, this.user.email).then((resposta) => this.trataDelUser(resposta));
  }

  trataDelUser = (data) => {
    if (data.retorno !== 'Ok') {
      const head = 'Atenção';
      const subh = 'Erro!';
      const msg = data.retorno;
      this.alertar(head, subh, msg);
    } else {
      const head = 'Atenção';
      const subh = 'Sucesso!';
      const msg = 'Registro removido com sucesso';
      // this.alertar(head, subh, msg);
      this.storageService.limpaRegUser();
      this.storageService.setRegUser('');
      this.nav.navigateRoot('/home', { animated: true, animationDirection: 'forward' });
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
}
