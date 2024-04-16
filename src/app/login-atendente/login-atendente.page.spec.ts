import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginAtendentePage } from './login-atendente.page';

describe('LoginAtendentePage', () => {
  let component: LoginAtendentePage;
  let fixture: ComponentFixture<LoginAtendentePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginAtendentePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginAtendentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
