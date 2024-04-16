import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DemoEnderecoPage } from './demo-endereco.page';

describe('DemoEnderecoPage', () => {
  let component: DemoEnderecoPage;
  let fixture: ComponentFixture<DemoEnderecoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoEnderecoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DemoEnderecoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
