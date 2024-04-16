import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalnovoatribPage } from './modalnovoatrib.page';

describe('ModalnovoatribPage', () => {
  let component: ModalnovoatribPage;
  let fixture: ComponentFixture<ModalnovoatribPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalnovoatribPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalnovoatribPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
