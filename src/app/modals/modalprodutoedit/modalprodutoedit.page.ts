import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiServices } from 'src/app/services/apiServices';
import { StorageService, Produto } from 'src/app/services/storage.service';

@Component({
  selector: 'app-modalprodutoedit',
  templateUrl: './modalprodutoedit.page.html',
  styleUrls: ['./modalprodutoedit.page.scss'],
})
export class ModalprodutoeditPage implements OnInit {

  private produto: Produto;
  private item: any;
  public descricaoProduto: string;
  public detalheProduto: string;
  public tipoProduto: string;
  public idProduto: number;

  constructor(private modalCtrl: ModalController,
    private storageService: StorageService,
    private api: ApiServices) { }

  ngOnInit() {
    this.produto = this.storageService.getStProd();
    this.item = this.storageService.getItemProd();
    console.log(this.produto);
    console.log(this.item);
    this.descricaoProduto = this.getDescProduto(this.produto);
    this.detalheProduto = this.getDetalheProduto(this.produto);
    this.tipoProduto = this.getNomeTipo(this.item);
    this.idProduto = this.getIdProduto(this.produto);
  }

  getDescProduto = (produto) => {
    return produto.descricao;
  }

  getDetalheProduto = (produto) => {
    return produto.detalhe;
  }

  getNomeTipo = (item) => {
    return item.tipo.nome;
  }

  getIdProduto = (produto) => {
    return produto.id;
  }

  alteraProduto = () => {
    let ok = true;
    if (this.descricaoProduto === undefined) {
      alert('Informe o nome do produto');
      ok = false;
    }
    if (ok) {
      if (this.descricaoProduto === '') {
        alert('Informe o nome do produto');
        ok = false;
      }
    }
    if (ok) {
      this.api.alteraProduto(this.idProduto, this.descricaoProduto, this.detalheProduto).then(reg => this.produtoAlterado(reg));
    }
  }

  produtoAlterado = (data) => {
    if (data.retorno === 'Ok') {
      alert('Produto atualizado');
      this.closeModal();
    }
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }
}
