import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DemoProdutosPage } from './demo-produtos.page';

describe('DemoProdutosPage', () => {
  let component: DemoProdutosPage;
  let fixture: ComponentFixture<DemoProdutosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoProdutosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DemoProdutosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
