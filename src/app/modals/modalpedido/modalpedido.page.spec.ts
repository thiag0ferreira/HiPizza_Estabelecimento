import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalpedidoPage } from './modalpedido.page';

describe('ModalpedidoPage', () => {
  let component: ModalpedidoPage;
  let fixture: ComponentFixture<ModalpedidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalpedidoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalpedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
