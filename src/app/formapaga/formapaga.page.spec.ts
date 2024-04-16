import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormapagaPage } from './formapaga.page';

describe('FormapagaPage', () => {
  let component: FormapagaPage;
  let fixture: ComponentFixture<FormapagaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormapagaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormapagaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
