import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarTechComponent } from './criar-tech.component';

describe('CriarTechComponent', () => {
  let component: CriarTechComponent;
  let fixture: ComponentFixture<CriarTechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarTechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
