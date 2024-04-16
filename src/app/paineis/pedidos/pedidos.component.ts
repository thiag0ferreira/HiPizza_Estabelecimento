import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {}

  goPedidos = () => {
    this.route.navigateByUrl('/pedidos');
  }
}
