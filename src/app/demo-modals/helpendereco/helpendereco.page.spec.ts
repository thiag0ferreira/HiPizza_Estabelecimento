import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HelpenderecoPage } from './helpendereco.page';

describe('HelpenderecoPage', () => {
  let component: HelpenderecoPage;
  let fixture: ComponentFixture<HelpenderecoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpenderecoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HelpenderecoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
