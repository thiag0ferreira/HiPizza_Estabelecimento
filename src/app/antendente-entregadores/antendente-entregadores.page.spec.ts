import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AntendenteEntregadoresPage } from './antendente-entregadores.page';

describe('AntendenteEntregadoresPage', () => {
  let component: AntendenteEntregadoresPage;
  let fixture: ComponentFixture<AntendenteEntregadoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntendenteEntregadoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AntendenteEntregadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
