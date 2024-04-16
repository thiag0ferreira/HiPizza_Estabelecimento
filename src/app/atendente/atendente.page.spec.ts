import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AtendentePage } from './atendente.page';

describe('AtendentePage', () => {
  let component: AtendentePage;
  let fixture: ComponentFixture<AtendentePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtendentePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AtendentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
