import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HelpedidoPage } from './helpedido.page';

describe('HelpedidoPage', () => {
  let component: HelpedidoPage;
  let fixture: ComponentFixture<HelpedidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpedidoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HelpedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
