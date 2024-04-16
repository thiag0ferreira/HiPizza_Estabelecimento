import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DemoFormapagaPage } from './demo-formapaga.page';

describe('DemoFormapagaPage', () => {
  let component: DemoFormapagaPage;
  let fixture: ComponentFixture<DemoFormapagaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoFormapagaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DemoFormapagaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
