import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegPedidoComponent } from './reg-pedido.component';

describe('RegPedidoComponent', () => {
  let component: RegPedidoComponent;
  let fixture: ComponentFixture<RegPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
