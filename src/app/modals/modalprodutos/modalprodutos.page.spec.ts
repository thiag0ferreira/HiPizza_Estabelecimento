import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalprodutosPage } from './modalprodutos.page';

describe('ModalprodutosPage', () => {
  let component: ModalprodutosPage;
  let fixture: ComponentFixture<ModalprodutosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalprodutosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalprodutosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
