import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalfopagPage } from './modalfopag.page';

describe('ModalfopagPage', () => {
  let component: ModalfopagPage;
  let fixture: ComponentFixture<ModalfopagPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalfopagPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalfopagPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
