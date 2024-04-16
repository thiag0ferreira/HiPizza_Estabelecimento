import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalhoraPage } from './modalhora.page';

describe('ModalhoraPage', () => {
  let component: ModalhoraPage;
  let fixture: ComponentFixture<ModalhoraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalhoraPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalhoraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
