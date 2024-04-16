import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecuperaCadastroPage } from './recupera-cadastro.page';

describe('RecuperaCadastroPage', () => {
  let component: RecuperaCadastroPage;
  let fixture: ComponentFixture<RecuperaCadastroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuperaCadastroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperaCadastroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
