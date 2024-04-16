import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PedidosclientemodalPage } from './pedidosclientemodal.page';

describe('PedidosclientemodalPage', () => {
  let component: PedidosclientemodalPage;
  let fixture: ComponentFixture<PedidosclientemodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosclientemodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PedidosclientemodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
