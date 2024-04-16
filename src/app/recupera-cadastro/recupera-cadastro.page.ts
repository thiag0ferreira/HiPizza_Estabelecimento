import { Component, OnInit } from '@angular/core';
import { ApiServices } from '../services/apiServices';
import { NavController, AlertController } from '@ionic/angular';
import { StorageService, RegistroUsuario, RegistroEstabelecimento } from '../services/storage.service';

@Component({
  selector: 'app-recupera-cadastro',
  templateUrl: './recupera-cadastro.page.html',
  styleUrls: ['./recupera-cadastro.page.scss'],
})
export class RecuperaCadastroPage implements OnInit {

  public tLogin: string;
  public tSenha: string;
  public regUser: RegistroUsuario;
  public stab: RegistroEstabelecimento;

  constructor(private api: ApiServices,
              private nav: NavController,
              public alertController: AlertController,
              private storageService: StorageService) { }

  ngOnInit() {
    console.log('recuperação');
    this.api.reCall(this.gotCab);
    this.api.getCab();
  }

  gotCab = () => {
    console.log('Setado');
  }

  recuperaDados = () => {
    let ok = true;
    const header = 'Atenção';
    const subh = 'consistência';
    if (this.tLogin === undefined) {
      const msg = 'Informe seu login';
      this.alertar(header, subh, msg);
      ok = false;
    }
    if (ok) {
      if (this.tLogin === '') {
        const msg = 'Informe seu login';
        this.alertar(header, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.tSenha === undefined) {
        const msg = 'Informe sua senha';
        this.alertar(header, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      if (this.tSenha === '') {
        const msg = 'Informe sua senha';
        this.alertar(header, subh, msg);
        ok = false;
      }
    }
    if (ok) {
      const parm = {
        login: this.tLogin,
        senha: this.tSenha
      };
      this.api.getCliente(parm).then(reg => this.gotCliente(reg));
    }
  }

  gotCliente = (data) => {
    if (data.id === undefined) {
      const header = 'Atenção';
      const subh = 'consistência';
      const msg = 'Erro recuperando seus dados';
      this.alertar(header, subh, msg);
    } else {
      this.regUser = {
        ddd: data.ddd,
        email: data.email,
        fantasia: data.fantasia,
        flow: 'token validado',
        fone: data.fone,
        id: data.id,
        idPerfil: data.perfil.id,
        nome: data.nome,
        login: data.login,
        senha: data.senha,
        cnpj: '',
        razao: data.razao,
        verificada: 'Ok'
      };
      this.storageService.salvaRegistroUser(this.regUser).then(reg => this.getStabs(reg));
    }
  }

  getStabs = (data) => {
    this.api.getStabsDeUser(this.regUser.id).then(regs => this.gotStabs(regs));
  }

  gotStabs = (data) => {
    console.log(data);
    if (data.estabelecimentos !== undefined) {
      if (typeof(data.estabelecimentos) === 'object') {
        this.stab = data.estabelecimentos[0];
        this.storageService.salvaEstabelecimento(this.stab).then(reg => this.goHome(reg));
      }
    }
  }

  goHome = (data) => {
    this.nav.navigateRoot('/menu', { animated: true, animationDirection: 'forward' });
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
