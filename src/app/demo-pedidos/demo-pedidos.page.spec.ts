import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DemoPedidosPage } from './demo-pedidos.page';

describe('DemoPedidosPage', () => {
  let component: DemoPedidosPage;
  let fixture: ComponentFixture<DemoPedidosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoPedidosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DemoPedidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
