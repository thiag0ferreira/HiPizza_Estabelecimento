import { Component, OnInit } from '@angular/core';
import { StorageService, RegistroUsuario, RegistroEstabelecimento, QuemEstaNavegando } from '../services/storage.service';
import { ApiServices } from '../services/apiServices';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { ModalestabelecimentoPage } from '../modals/modalestabelecimento/modalestabelecimento.page';
import { ModalhoraPage } from '../modals/modalhora/modalhora.page';

interface Horario {
  hora1: number;
  Minuto1: number;
  hora2: number;
  minuto2: number;
  dias: string;
}

@Component({
  selector: 'app-estabelecimento',
  templateUrl: './estabelecimento.page.html',
  styleUrls: ['./estabelecimento.page.scss'],
})
export class EstabelecimentoPage implements OnInit {

  public user: any;
  public razao;
  public fantasia;
  public site;
  public email;
  public contato;
  public cargo;
  public depto;
  public fonContato;
  public cnpj: string;
  public ie;
  public stab: any;
  public horarios: Horario[];
  public idHora: number;
  private operadorModel: QuemEstaNavegando;

  constructor(private storageService: StorageService,
              private api: ApiServices,
              public modalCtrl: ModalController,
              private alertController: AlertController,
              private nav: NavController) { }

  ngOnInit() {
    console.log('Estabelecimento');
    // this.storageService.getUser().then((reg) => this.gotUser(reg));
    const usr = this.storageService.regUser;
    if (usr === undefined) {
      console.log('undefined');
    }
    if (usr === null) {
      console.log('Nulo');
    }
    console.log('mostra usr');
    console.log(usr);
    if (usr === '') {
      console.log('Branco');
    }
    this.gotUser(usr);
  }

  gotUser = (reg) => {
    this.user = reg;
    console.log(reg);
    this.razao = reg.razao;
    this.fantasia = reg.fantasia;
    this.stab = this.storageService.getStab();
    if (this.stab === null || this.stab === undefined) {
      this.getStab();
    } else {
      console.log(this.stab);
      this.gotStab();
    }
  }

  gotStab = () => {
    this.razao = this.stab.razaoSocial;
    this.fantasia = this.stab.fantasia;
    this.site = (this.stab.website === null) ? '' : this.stab.website;
    this.email = (this.stab.email === null) ? '' : this.stab.email;

    this.contato = (this.stab.contatoEmpresa === null) ? '' : this.stab.contatoEmpresa;
    this.cargo = (this.stab.cargoContato === null) ? '' : this.stab.cargoContato;
    this.depto = (this.stab.deptoContato === null) ? '' : this.stab.deptoContato;
    this.fonContato = (this.stab.fone === null) ? '' : '(' + this.stab.ddd + ') ' + this.stab.fone;

    this.cnpj = (this.stab.cnpj === null) ? '' : this.stab.cnpj;
    this.ie = (this.stab.ie === null) ? '' : this.stab.ie;
    console.log('Colocando ' + this.razao + ' e ' + this.fantasia);
    this.api.reCall(this.getHorarios);
    this.api.getCab();
  }

  getHorarios = () => {
    this.api.getHorarios(this.stab.id).then(lista => this.gotHorarios(lista));
  }

  gotHorarios = (data) => {
    console.log(data);
    this.horarios = data;
  }

  doAcerto = () => {
    const tam = screen.width;
    const el = document.getElementById('iLista');
    if (tam < 768) {
      el.style.setProperty('padding-left', '5%');
      el.style.setProperty('padding-right', '5%');
    } else {
      el.style.setProperty('padding-left', '35%');
      el.style.setProperty('padding-right', '35%');
    }
  }

  editar = (campo) => {
    console.log('Editando ' + campo);
    this.storageService.setCampoEdit(campo);
    this.openModal();
  }

  getStab = () => {
    this.storageService.getEstabelecimento().then((reg) => this.regStab(reg));
  }
  regStab = (reg) => {
    if (reg === null) {
      const head = 'Atenção';
      const subh = 'Navegar';
      const msg = 'Vemos que você ainda não se cadastrou. Agora você deve decidir se deseja se cadastrar ou navegar em modo demonstração';
      this.alertDesvia(head, subh, msg);
    } else {
      const stab: RegistroEstabelecimento = reg;
      if (this.storageService.getOperador() === undefined) {
        console.log(stab);
        this.operadorModel = {
          id: reg.cliente.id,
          idPerfil: reg.cliente.perfil.id,
          nomePerfil: reg.cliente.perfil.nome
        }
        this.storageService.setOperador(this.operadorModel);
      } else {
        this.operadorModel = this.storageService.getOperador();
      }
      this.storageService.setStab(stab);
      console.log(stab);
      this.stab = stab;
      this.gotStab();
    }
  }

  goAquarioCadastro = () => {
    this.nav.navigateRoot('/demo-menu', { animated: true, animationDirection: 'forward' });
  }
  
  cadastroBasico = () => {
    this.nav.navigateRoot('/cadastro-basico', { animated: true, animationDirection: 'forward' });
  }
  
  maisHora = () => {
    this.openModalHora();
  }

  apagaHorario = (id) => {
    this.idHora = id;
    const head = 'Atenção';
    const subh = 'Decisão';
    const msg = 'Confirma intenção de apagar o regisgtro ?';
    this.alertDecide(head, subh, msg);
  }

  goApagaHorario = () => {
    this.api.removeHorarioEstabelecimento(this.idHora).then(ret => this.removido(ret));
  }

  removido = (data) => {
    if (data.retorno === 'Ok') {
      this.api.getHorarios(this.stab.id).then(lista => this.gotHorarios(lista));
    } else {
      const head = 'Atenção';
      const subh = 'Erro!';
      const msg = data.retorno;
      this.alertar(head, subh, msg);
    }
  }

  terminou = (bol) => {
    if (bol) {
      this.doAcerto();
    }
  }

  goPedidos = () => {
    this.nav.navigateRoot('/pedidos', { animated: true, animationDirection: 'forward' });
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalestabelecimentoPage
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.getStab();
    });
    return await modal.present();
  }

  async openModalHora() {
    const modal = await this.modalCtrl.create({
      component: ModalhoraPage
    });
    modal.onDidDismiss().then((data) => {
      this.api.getHorarios(this.stab.id).then(lista => this.gotHorarios(lista));
    });
    return await modal.present();
  }

  segmentChanged = (data) => {
    const pagina = data.detail.value;
    if (pagina === 'cadastro') {
      this.nav.navigateRoot('/menu', { animated: true, animationDirection: 'forward' });
    }
    if (pagina === 'welcome') {
      this.nav.navigateRoot('/welcome', { animated: true, animationDirection: 'forward' });
    }
    if (pagina === 'pedido') {
      this.nav.navigateRoot('/pedidos', { animated: true, animationDirection: 'forward' });
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

  async alertDecide(head, subHead, parm) {
    const alert = await this.alertController.create({
      header: head,
      subHeader: subHead,
      message: parm,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.goApagaHorario();
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

  removeDados = () => {
    this.storageService.limpaRegUser();
    this.storageService.limpaRegHip();
  }

  async alertDesvia(head, subHead, parm) {
    const alert = await this.alertController.create({
      header: head,
      subHeader: subHead,
      message: parm,
      buttons: [
        {
          text: 'Quero me cadastrar',
          handler: () => {
            this.cadastroBasico();
          }
        },
        {
          text: 'Navegar em demonstração',
          handler: () => {
            this.goAquarioCadastro();
          }
        },
        {
          text: 'Limpar cadastro',
          handler: () => {
            this.removeDados();
          }
        }
      ]
    });
    return await alert.present();
  }
}
