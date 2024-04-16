import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DemoStabPage } from './demo-stab.page';

describe('DemoStabPage', () => {
  let component: DemoStabPage;
  let fixture: ComponentFixture<DemoStabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoStabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DemoStabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
