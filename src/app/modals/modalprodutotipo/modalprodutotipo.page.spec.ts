import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalprodutotipoPage } from './modalprodutotipo.page';

describe('ModalprodutotipoPage', () => {
  let component: ModalprodutotipoPage;
  let fixture: ComponentFixture<ModalprodutotipoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalprodutotipoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalprodutotipoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
