import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalentregaPage } from './modalentrega.page';

describe('ModalentregaPage', () => {
  let component: ModalentregaPage;
  let fixture: ComponentFixture<ModalentregaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalentregaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalentregaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
