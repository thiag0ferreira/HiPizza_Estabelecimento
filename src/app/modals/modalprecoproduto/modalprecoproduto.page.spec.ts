import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalprecoprodutoPage } from './modalprecoproduto.page';

describe('ModalprecoprodutoPage', () => {
  let component: ModalprecoprodutoPage;
  let fixture: ComponentFixture<ModalprecoprodutoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalprecoprodutoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalprecoprodutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
