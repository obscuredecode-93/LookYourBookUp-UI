import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionReportComponent } from './condition-report.component';

describe('ConditionReportComponent', () => {
  let component: ConditionReportComponent;
  let fixture: ComponentFixture<ConditionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
