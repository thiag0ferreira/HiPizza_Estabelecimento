import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiServices } from '../services/apiServices';
import { StorageService, QuemEstaNavegando } from '../services/storage.service';

interface LoginAtendente {
  idEntidade: number,
  login: string,
  senha: string
}

@Component({
  selector: 'app-login-atendente',
  templateUrl: './login-atendente.page.html',
  styleUrls: ['./login-atendente.page.scss'],
})
export class LoginAtendentePage implements OnInit {

  public grande = false;
  public pequeno = true;
  public tIdStab: number;
  public tLogin: string;
  public tSenha: string;
  public loginModel: LoginAtendente;
  private operadorModel: QuemEstaNavegando;

  constructor(private api: ApiServices,
    private storageService: StorageService,
    private nav: NavController) { }

  ngOnInit() {
    console.log('login do entregador');
    const tam = screen.width;
    if (tam < 768) {
      this.pequeno = true;
      this.grande = false;
    } else {
      this.pequeno = false;
      this.grande = true;
    }
    this.api.reCall(this.nada);
    this.api.getCab();
  }

  nada = () => {

  }

  loginAtendente = () => {
    let ok = true;
    if (this.tIdStab === undefined) {
      alert('Informe o ID do Estabelecimento');
      ok = false;
    }
    if (ok) {
      if (this.tLogin === undefined) {
        alert('Informe o login');
        ok = false;
      }
    }
    if (ok) {
      if (this.tLogin === '') {
        alert('Informe o login');
        ok = false;
      }
    }
    if (ok) {
      if (this.tSenha === undefined) {
        alert('Informe a senha');
        ok = false;
      }
    }
    if (ok) {
      if (this.tSenha === '') {
        alert('Informe a senha');
        ok = false;
      }
    }

    if (ok) {
      this.loginModel = {
        idEntidade: this.tIdStab,
        login: this.tLogin,
        senha: this.tSenha
      }
      this.api.loginEntregador(this.loginModel).then(res => this.retornoLogin(res));
    }
  }

  retornoLogin = (res) => {
    console.log(res);
    if (res.resposta !== 'Ok') {
      alert('Login não foi autorizado');
    } else {
      this.storageService.setIdReg(res.idGravado);
      this.operadorModel= res;
      this.storageService.setOperador(res);
      this.api.getEstabelecimento(this.tIdStab).then(res => this.gotStab(res));
    }
  }
  
  gotStab = (res) => {
    console.log(res);
    const stab = res;
    this.storageService.salvaEstabelecimento(stab).then(reg => this.goAtend(reg));
  }
  
  goAtend = (reg) => {
    this.nav.navigateRoot('/atendente', { animated: true, animationDirection: 'forward' });
  }
}
