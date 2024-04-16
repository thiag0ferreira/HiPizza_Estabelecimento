import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EntregadorDadosPage } from './entregador-dados.page';

describe('EntregadorDadosPage', () => {
  let component: EntregadorDadosPage;
  let fixture: ComponentFixture<EntregadorDadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregadorDadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EntregadorDadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
