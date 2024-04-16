import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiServices } from '../services/apiServices';
import { QuemEstaNavegando, StorageService } from '../services/storage.service';

interface LoginEntregador {
  idEntidade: number,
  login: string,
  senha: string
}

@Component({
  selector: 'app-login-entregador',
  templateUrl: './login-entregador.page.html',
  styleUrls: ['./login-entregador.page.scss'],
})
export class LoginEntregadorPage implements OnInit {
  
  public grande = false;
  public pequeno = true;

  public tIdStab: number;
  public tLogin: string;
  public tSenha: string;

  public loginModel: LoginEntregador;
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

  loginEntregador = () => {
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
      this.nav.navigateRoot('/entregador', { animated: true, animationDirection: 'forward' });
    }
  }
}
