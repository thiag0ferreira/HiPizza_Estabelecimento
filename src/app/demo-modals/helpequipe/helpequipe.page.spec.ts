import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HelpequipePage } from './helpequipe.page';

describe('HelpequipePage', () => {
  let component: HelpequipePage;
  let fixture: ComponentFixture<HelpequipePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpequipePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HelpequipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
