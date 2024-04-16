import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginEntregadorPage } from './login-entregador.page';

describe('LoginEntregadorPage', () => {
  let component: LoginEntregadorPage;
  let fixture: ComponentFixture<LoginEntregadorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginEntregadorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginEntregadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
