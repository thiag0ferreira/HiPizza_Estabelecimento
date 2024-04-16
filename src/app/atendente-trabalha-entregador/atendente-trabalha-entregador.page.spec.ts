import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AtendenteTrabalhaEntregadorPage } from './atendente-trabalha-entregador.page';

describe('AtendenteTrabalhaEntregadorPage', () => {
  let component: AtendenteTrabalhaEntregadorPage;
  let fixture: ComponentFixture<AtendenteTrabalhaEntregadorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtendenteTrabalhaEntregadorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AtendenteTrabalhaEntregadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
