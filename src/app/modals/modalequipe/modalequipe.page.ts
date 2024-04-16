import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiServices } from '../../services/apiServices';
import { FormatServices } from '../../services/formatService';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-modalequipe',
  templateUrl: './modalequipe.page.html',
  styleUrls: ['./modalequipe.page.scss'],
})
export class ModalequipePage implements OnInit {

  public prontaApi: boolean;
  public perfil: {
    id: number,
    nome: string
  };
  public perfis: any;
  public rf1: boolean;
  public rf2: boolean;
  public ftipos: any;
  public qtipo: string;

  public idPessoa: number;
  public labelGrava: string;
  public showLogin: boolean;

  public equipe: {
    nome: string,
    apelido: string,
    ddd: string,
    fone: string,
    sexo: string,
    email: string,
    perfil: {
      id: number,
      nome: string
    },
    nasc: string,
    id: number,
    login: string,
    senha: string,
    veiculo: string,
    placa: string
  };
  public stab: any;

  public tNome: string;
  public tApelido: string;
  public Perfil: number;
  public tFone: string;
  public tEmail: string;
  public tDnasc: string;
  public tDdd: string;
  public rSexo: string;
  public tPerfil: number;
  public tLoginEntr: string;
  public tSenhaEntr: string;
  public tVeiculo: string;
  public tPlaca: string;

  public pessoa: any;
  private perfisLogin = [3,4,5];

  constructor(private modalCtrl: ModalController,
              private api: ApiServices,
              public formatService: FormatServices,
              public alertController: AlertController,
              private storageService: StorageService) {
                this.prontaApi = false;
                this.ftipos = [{tipo: 'Fixo'}, {tipo: 'Celular'}];
              }

  ngOnInit() {
    this.labelGrava = 'Gravar';
    this.showLogin = false;
    this.idPessoa = this.storageService.getPessoaEquipe();
    this.api.reCall(this.getListaPerfis);
    this.api.getCab();
    console.log('equipeModal');
  }

  getListaPerfis = () => {
    this.prontaApi = true;
    this.api.getPerfis().then((reg) => this.gotPerfis(reg));
  }
  gotPerfis = (data) => {
    this.perfis = data.perfis;
    console.log(this.perfis);
    this.api.reCall(this.fazNada);
    this.getStab();
  }
  getStab = () => {
    this.storageService.getEstabelecimento().then((reg) => this.gotStab(reg));
  }
  gotStab = (data) => {
    this.stab = data;
    if (this.idPessoa !== 0) {
      console.log('Editando...');
      this.pegaPessoa(this.idPessoa);
    } else {
      console.log('Nova pessoa');
    }
  }

  pegaPessoa = (id) => {
    this.api.getPessoa(id).then((reg) => this.gotPessoa(reg));
  }
  gotPessoa = (data) => {
    console.log(data);
    this.storageService.setPessoaEquipe(0);
    this.pessoa = data;
    this.populaPessoa();
  }
  populaPessoa = () => {
    this.tNome = this.pessoa.nome;
    this.tApelido = this.pessoa.apelido;
    this.tFone = '(' + this.pessoa.ddd + ') ' + this.pessoa.fone;
    this.tEmail = this.pessoa.email;
    this.tPerfil = this.pessoa.perfil.id.toString();
    this.tDnasc = this.pessoa.nasc;
    // this.tDnasc = this.tDnasc.numGent();
    this.rSexo = this.pessoa.sexo;
    this.tLoginEntr = this.pessoa.login;
    this.tSenhaEntr = this.pessoa.senha;
    this.tVeiculo = this.pessoa.veiculo;
    this.tPlaca = this.pessoa.placa;
    this.labelGrava = 'Alterar';
    this.showLogin = false;
    if (this.perfisLogin.indexOf(this.pessoa.perfil.id) >= 0) {
      this.showLogin = true;
    }
  }

  formata = (idElemento, qTipo) => {
    this.formatService.mascaraFone(idElemento, qTipo);
  }

  tipoFoneClicado = (qual) => {
    console.log('Tipo: ' + qual);
    if (qual === 'Fixo') {
      this.rf1 = true;
      this.rf2 = false;
      this.qtipo = '1';
    } else {
      this.rf1 = false;
      this.rf2 = true;
      this.qtipo = '2';
    }
  }

  gravaNovo = () => {
    let ok = true;
    const head = 'Atenção';
    const subh = 'consistência';
    if (this.tNome === undefined) {
      const msg = 'Informe seu nome';
      this.alertar(head, subh, msg);
      ok = false;
    }
    if (ok) {
      if (this.tNome === '') {
        const msg = 'Informe seu nome';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.tApelido === undefined) {
        const msg = 'Informe como quer ser tratado';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.tApelido === '') {
        const msg = 'Informe como quer ser tratado';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.tPerfil === undefined) {
        const msg = 'Defina um perfil';
        this.alertar(head, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.tFone === undefined) {
        this.tFone = '';
      }
    }
    if (ok) {
      if (this.tEmail === undefined) {
        this.tEmail = '';
      } else {
        const n = this.tEmail.indexOf('@');
        if (n <= 0) {
          const msg = 'E-mail inválido';
          this.alertar(head, subh, msg);
          ok = false;
        }
        if (ok) {
          if (this.tEmail.lastIndexOf('.') < n) {
            const msg = 'E-mail inválido';
            this.alertar(head, subh, msg);
            ok = false;
          }
        }
      }
    }
    if (ok) {
      if (this.tDnasc === undefined) {
        this.tDnasc = '';
      }
    }
    if (ok) {
      const perfo = this.storageService.getJsonByCampo(this.perfis, 'id', this.tPerfil);
      this.tDdd = '';
      if (this.tFone !== '') {
        const separado = this.formatService.separaFone(this.tFone);
        const partes = separado.split(':');
        this.tDdd = partes[0];
        this.tFone = partes[1];
      }
      if (this.tDnasc.length > 10) {
        this.tDnasc = this.tDnasc.substring(0, 10);
      }
      this.tDnasc = this.tDnasc + 'T30:00:00-03:00';
      this.perfil = {
        id: perfo.id,
        nome: perfo.nome
      };
      let login = this.tLoginEntr;
      if (login === undefined) {
        login = '';
      }
      let senha = this.tSenhaEntr;
      if (senha === undefined) {
        senha = '';
      }
      let veiculo = this.tVeiculo;
      if (veiculo === undefined) {
        veiculo = '';
      }
      let placa = this.tPlaca;
      if (placa === undefined) {
        placa = '';
      }
      this.equipe = {
        apelido: this.tApelido,
        email: this.tEmail,
        fone: this.tFone,
        nasc: this.tDnasc,
        nome: this.tNome,
        perfil: this.perfil,
        sexo: this.rSexo,
        ddd: this.tDdd,
        id: this.idPessoa,
        login: login,
        senha: senha,
        veiculo: veiculo,
        placa: placa
      };
      this.api.putEquipe(this.equipe, this.stab.id).then((reg) => this.didEquipe(reg));
    }
  }
  didEquipe = (data) => {
    console.log(data);
    if (data.id !== undefined) {
      this.closeModal();
    }
  }

  apagaPessoa = () => {
    const head = 'Atenção';
    const subh = 'Decisão';
    const msg = 'Confirma intenção de apagar o regisgtro ?';
    this.alertDecide(head, subh, msg);
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
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
    await alert.present();
  }

  goApaga = () => {
    this.api.apagaPessoa(this.idPessoa).then((resp) => console.log(resp));
  }

  fazNada = () => {

  }
  tstFn = () => {
    // this.api.tstFn(this.toConsole, 'kk');
    this.api.getCab();
  }
  toConsole = (dado) => {
    console.log(dado);
  }
}
