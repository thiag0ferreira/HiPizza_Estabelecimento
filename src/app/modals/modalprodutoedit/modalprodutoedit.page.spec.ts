import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalprodutoeditPage } from './modalprodutoedit.page';

describe('ModalprodutoeditPage', () => {
  let component: ModalprodutoeditPage;
  let fixture: ComponentFixture<ModalprodutoeditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalprodutoeditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalprodutoeditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
