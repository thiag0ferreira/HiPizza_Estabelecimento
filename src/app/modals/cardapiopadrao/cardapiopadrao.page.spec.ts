import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardapiopadraoPage } from './cardapiopadrao.page';

describe('CardapiopadraoPage', () => {
  let component: CardapiopadraoPage;
  let fixture: ComponentFixture<CardapiopadraoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardapiopadraoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardapiopadraoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
