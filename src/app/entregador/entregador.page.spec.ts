import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EntregadorPage } from './entregador.page';

describe('EntregadorPage', () => {
  let component: EntregadorPage;
  let fixture: ComponentFixture<EntregadorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregadorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EntregadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
