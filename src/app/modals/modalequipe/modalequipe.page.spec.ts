import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalequipePage } from './modalequipe.page';

describe('ModalequipePage', () => {
  let component: ModalequipePage;
  let fixture: ComponentFixture<ModalequipePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalequipePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalequipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
