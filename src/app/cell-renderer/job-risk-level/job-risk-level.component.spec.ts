import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRiskLevelComponent } from './job-risk-level.component';

describe('JobRiskLevelComponent', () => {
  let component: JobRiskLevelComponent;
  let fixture: ComponentFixture<JobRiskLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobRiskLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRiskLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
