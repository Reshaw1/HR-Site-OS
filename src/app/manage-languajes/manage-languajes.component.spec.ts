import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLanguajesComponent } from './manage-languajes.component';

describe('ManageLanguajesComponent', () => {
  let component: ManageLanguajesComponent;
  let fixture: ComponentFixture<ManageLanguajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageLanguajesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLanguajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
