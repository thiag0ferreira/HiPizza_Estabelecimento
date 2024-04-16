import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HelpnovoprodutoPage } from './helpnovoproduto.page';

describe('HelpnovoprodutoPage', () => {
  let component: HelpnovoprodutoPage;
  let fixture: ComponentFixture<HelpnovoprodutoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpnovoprodutoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HelpnovoprodutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
