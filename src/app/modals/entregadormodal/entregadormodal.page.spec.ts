import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EntregadormodalPage } from './entregadormodal.page';

describe('EntregadormodalPage', () => {
  let component: EntregadormodalPage;
  let fixture: ComponentFixture<EntregadormodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregadormodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EntregadormodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
