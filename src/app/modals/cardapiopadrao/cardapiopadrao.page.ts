import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiServices } from 'src/app/services/apiServices';
import { StorageService, Produto, RegistroEstabelecimento } from 'src/app/services/storage.service';

interface ProdSelec extends Produto {
  sel: boolean;
}

@Component({
  selector: 'app-cardapiopadrao',
  templateUrl: './cardapiopadrao.page.html',
  styleUrls: ['./cardapiopadrao.page.scss'],
})
export class CardapiopadraoPage implements OnInit {

  private pagina: number;
  private passo: number;
  public produtos: ProdSelec[];
  public produto: ProdSelec;
  public first = false;
  public mais = false;
  public pequeno: boolean;
  public grande: boolean;
  private marcados: any;
  private carregou = false;
  private stab: RegistroEstabelecimento;
  private strMarcados: string;

  constructor(private modalCtrl: ModalController,
    private api: ApiServices,
    private storageService: StorageService,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.pagina = 0;
    this.passo = 4;
    const tam = screen.width;
    if (tam < 768) {
      this.pequeno = true;
      this.grande = false;
    } else {
      this.pequeno = false;
      this.grande = true;
    }
    // this.marcados = new Array;
    this.api.reCall(this.getProdutosPadrao);
    this.api.getCab();
  }

  getProdutosPadrao = () => {
    this.api.getCardapioPadrao().then(produtos => this.gotProdutos(produtos));
  }

  gotProdutos = (data) => {
    this.produtos = data; 
    console.log(this.produtos);
    console.log(data);
    // try {
    //   x=x+1
    // } catch (e) {
    //   console.log('Errou');
    // }
    /*
    this.produtos.forEach(p => {
      const ch = 'k' + p.id;
      console.log('Verificando id='+p.id+' contra ');
      console.log(this.marcados);
      console.log('...');
      p.sel = false;
      if (this.marcados === undefined) {
        let tx = '{"k' + p.id + '":"0"}';
        this.marcados = JSON.parse(tx);
      }
      if (this.marcados[ch] === '1') {
        p.sel = true;
        let elemento =document.getElementById(ch);
        if (elemento !== null) {
          elemento.checked = true;
        }
      }
      console.log(p.sel);
    });
    */
    this.cdRef.detectChanges();
    if (this.carregou) {
      this.ionViewDidEnter();
    }
  }

  marcar = (id) => {
    this.produto = this.storageService.getJsonByCampo(this.produtos, 'id', id);
    if (this.marcados === undefined) {
      let tx = '{"k' + id + '":"0"}';
      this.marcados = JSON.parse(tx);
    }
    console.log('Trabalhando ' + this.produto.nome + ' (' + this.produto.id + ') sel: ' + this.produto.sel);
    console.log('Marcados: ');
    console.log(this.marcados);
    const ch = 'k' + id;
    if (this.produto.sel) {
      console.log('Vou desmarcar...');
      this.produto.sel = false;
      this.marcados[ch] = '0';
    } else {
      console.log('Vou Marcar...');
      this.produto.sel = true;
      this.marcados[ch] = '1';
    }
    const i = ''+this.storageService.getIdxJson;
    this.produtos[i] = this.produto;
    console.log('Monstando se modificou produto...');
    console.log(this.produtos);
    let tx = JSON.stringify(this.marcados);
    console.log('tx: ' + tx);
    console.log(this.marcados);
  }

  importaProdutos = () => {
    let i = 0;
    let codigos = new Array;
    Object.keys(this.marcados).map(ch => {
      if (this.marcados[ch] === '1') {
        codigos[codigos.length] = ch.substring(1);
      }
    });
    console.log('Marcados: ' + codigos);
    // try {
    //   x=x+1
    // } catch (e) {
    //   console.log('Errou');
    // }
    this.storageService.getEstabelecimento().then((reg) => {
      this.stab = reg;
      this.strMarcados = codigos.toString();
      this.tombaCardapio();
    });
  }

  tombaCardapio = () => {
    this.api.tombamento(this.stab.id, this.strMarcados).then(ret => this.retornaTombamento(ret));
  }

  retornaTombamento = (data) => {
    console.log(data);
    if (data.retorno === 'Ok') {
      this.closeModal();
    }
  }

  goVoltar = () => {
    this.pagina--;
    this.getProdutosPadrao();
  }

  goAdiante = () => {
    this.pagina++;
    this.getProdutosPadrao();
  }

  ionViewDidLeave(){
    console.log('Saiu');
  }

  ionViewDidEnter(){
    this.produtos.forEach(p => {
      const ch = 'k' + p.id;
      console.log('Verificando id='+p.id+' contra ');
      console.log(this.marcados);
      console.log('...');
      p.sel = false;
      if (this.marcados === undefined) {
        let tx = '{"k' + p.id + '":"0"}';
        this.marcados = JSON.parse(tx);
      }
      if (this.marcados[ch] === '1') {
        p.sel = true;
        let elemento =document.getElementById(ch);
        if (elemento !== null) {
          this.elChecado(elemento);
        }
      }
    });
    console.log('Entrou');
    this.carregou = true;
  }

  elChecado = (elemento) => {
    elemento.checked = true;
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }
}
