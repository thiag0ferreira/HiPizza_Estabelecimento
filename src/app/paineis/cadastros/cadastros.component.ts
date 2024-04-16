import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastros',
  templateUrl: './cadastros.component.html',
  styleUrls: ['./cadastros.component.scss'],
})
export class CadastrosComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {}

  goCadastro = () => {
    this.route.navigateByUrl('/menu');
  }
}
