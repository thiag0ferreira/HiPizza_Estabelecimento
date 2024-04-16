import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PedidostatusmodalPage } from './pedidostatusmodal.page';

describe('PedidostatusmodalPage', () => {
  let component: PedidostatusmodalPage;
  let fixture: ComponentFixture<PedidostatusmodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidostatusmodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PedidostatusmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
