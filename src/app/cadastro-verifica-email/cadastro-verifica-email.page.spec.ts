import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CadastroVerificaEmailPage } from './cadastro-verifica-email.page';

describe('CadastroVerificaEmailPage', () => {
  let component: CadastroVerificaEmailPage;
  let fixture: ComponentFixture<CadastroVerificaEmailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroVerificaEmailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroVerificaEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
