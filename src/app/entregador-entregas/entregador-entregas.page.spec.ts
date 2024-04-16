import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EntregadorEntregasPage } from './entregador-entregas.page';

describe('EntregadorEntregasPage', () => {
  let component: EntregadorEntregasPage;
  let fixture: ComponentFixture<EntregadorEntregasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregadorEntregasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EntregadorEntregasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
