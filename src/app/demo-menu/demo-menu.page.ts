import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demo-menu',
  templateUrl: './demo-menu.page.html',
  styleUrls: ['./demo-menu.page.scss'],
})
export class DemoMenuPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
    this.route.navigate(['demo-menu/stab']);
  }

}
