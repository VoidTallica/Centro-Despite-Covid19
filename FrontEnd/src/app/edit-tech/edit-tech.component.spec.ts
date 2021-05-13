import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTechComponent } from './edit-tech.component';

describe('EditTechComponent', () => {
  let component: EditTechComponent;
  let fixture: ComponentFixture<EditTechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
