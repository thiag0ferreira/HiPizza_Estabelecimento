import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DemoEquipePage } from './demo-equipe.page';

describe('DemoEquipePage', () => {
  let component: DemoEquipePage;
  let fixture: ComponentFixture<DemoEquipePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoEquipePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DemoEquipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
