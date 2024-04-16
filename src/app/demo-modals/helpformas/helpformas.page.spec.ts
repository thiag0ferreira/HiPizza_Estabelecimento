import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HelpformasPage } from './helpformas.page';

describe('HelpformasPage', () => {
  let component: HelpformasPage;
  let fixture: ComponentFixture<HelpformasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpformasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HelpformasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
