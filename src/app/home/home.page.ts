import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService, RegistroUsuario } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit{

  private user: RegistroUsuario;
  public serv: string;
  public souCad: boolean;

  constructor(private nav: NavController,
              private storageService: StorageService) {}

  ngOnInit(): void {
    this.serv = 'local';
    this.souCad = false;
    this.storageService.getUser().then((usr) => this.pegaUser(usr));
  }
  pegaUser = (usr) => {
    if (usr === undefined) {
      console.log('undefined');
    }
    if (usr === null) {
      console.log('Nulo'); 
    } else {
      this.user = usr;
      if (typeof(usr) === 'object') {
        this.user = usr[0];
      }
    }
    if (this.user !== undefined) {
      if (this.user !== null) {
        console.log(usr);
        if (this.user.flow === 'token enviado') {
          this.storageService.setRegUser(usr);
          this.nav.navigateRoot('/cadastro-verifica-email', { animated: true, animationDirection: 'forward' });
        }
        if (this.user.flow === 'token validado') {
          this.souCad = true;
        }
      }
    }
    this.getServ();
  }

  cadastroBasico = () => {
    this.nav.navigateRoot('/cadastro-basico', { animated: true, animationDirection: 'forward' });
  }

  cadastrado = () => {
    this.nav.navigateRoot('/recupera-cadastro', { animated: true, animationDirection: 'forward' });
  }

  cadastrar = () => {
    
  }

  removerCadastro = () => {
    this.storageService.apagaEstabelecimento();
  }

  goMenu = () => {
    this.nav.navigateRoot('/menu', { animated: true, animationDirection: 'forward' });
  }

  welcome = () => {
    this.nav.navigateRoot('/welcome', { animated: true, animationDirection: 'forward' });
  }

  loginEntregador = () => {
    this.nav.navigateRoot('/login-entregador', { animated: true, animationDirection: 'forward' });
  }

  loginAtendente = () => {
    this.nav.navigateRoot('/login-atendente', { animated: true, animationDirection: 'forward' });
  }

  getServ = () => {
    this.storageService.getServer().then((reg) => this.gotServ(reg));
  }
  gotServ = (data) => {
    console.log(data);
    if (data === null) {
      this.serv = 'indefinido';
      console.log('Nulo');
    } else {
      this.serv = data;
    }
  }
  mudaServ = () => {
    if (this.serv === 'local') {
      this.serv = 'nuvem';
    } else {
      this.serv = 'local';
    }
    this.storageService.setServer(this.serv).then((resp) => console.log(resp));
  }
  setVarServ = (data) => {
    this.getServ();
  }
}
