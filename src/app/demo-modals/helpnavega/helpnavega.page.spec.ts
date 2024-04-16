import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HelpnavegaPage } from './helpnavega.page';

describe('HelpnavegaPage', () => {
  let component: HelpnavegaPage;
  let fixture: ComponentFixture<HelpnavegaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpnavegaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HelpnavegaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
