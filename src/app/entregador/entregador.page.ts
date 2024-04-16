import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuemEstaNavegando, StorageService } from '../services/storage.service';

@Component({
  selector: 'app-entregador',
  templateUrl: './entregador.page.html',
  styleUrls: ['./entregador.page.scss'],
})
export class EntregadorPage implements OnInit {

  private operadorModel: QuemEstaNavegando;

  constructor(private route: Router,
    private storageService: StorageService) { }

  ngOnInit() {
    this.operadorModel = this.storageService.getOperador();
    if (this.operadorModel.idPerfil !== 5) {
      alert('Login não autorizado');
      this.route.navigate(['login-entregador']);
    } else {
      this.route.navigate(['entregador/stab']);
    }
  }

}
