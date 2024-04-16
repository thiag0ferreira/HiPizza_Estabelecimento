import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DemoMenuPage } from './demo-menu.page';

describe('DemoMenuPage', () => {
  let component: DemoMenuPage;
  let fixture: ComponentFixture<DemoMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DemoMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
