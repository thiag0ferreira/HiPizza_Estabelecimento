import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService, QuemEstaNavegando } from '../services/storage.service';

@Component({
  selector: 'app-atendente',
  templateUrl: './atendente.page.html',
  styleUrls: ['./atendente.page.scss'],
})
export class AtendentePage implements OnInit {

  private operadorModel: QuemEstaNavegando;
  constructor(private route: Router,
    private storageService: StorageService) { }

  ngOnInit() {
    this.operadorModel = this.storageService.getOperador();
    if (this.operadorModel.idPerfil !== 4) {
      alert('Login não autorizado');
      this.route.navigate(['login-atendente']);
    } else {
      this.route.navigate(['atendente/stab']);
    }
  }

}
