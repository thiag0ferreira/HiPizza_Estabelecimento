import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HelphorariosPage } from './helphorarios.page';

describe('HelphorariosPage', () => {
  let component: HelphorariosPage;
  let fixture: ComponentFixture<HelphorariosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelphorariosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HelphorariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
