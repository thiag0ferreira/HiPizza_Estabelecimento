import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EntregadorEstabelecimentoPage } from './entregador-estabelecimento.page';

describe('EntregadorEstabelecimentoPage', () => {
  let component: EntregadorEstabelecimentoPage;
  let fixture: ComponentFixture<EntregadorEstabelecimentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregadorEstabelecimentoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EntregadorEstabelecimentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
