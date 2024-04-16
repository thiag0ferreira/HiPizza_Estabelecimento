import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public razao: string;

  constructor(private route: Router) { }

  ngOnInit() {
    this.route.navigate(['menu/stab']);
  }

}
