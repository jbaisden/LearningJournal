import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningEntryComponent } from './learning-entry.component';

describe('LearningEntryComponent', () => {
  let component: LearningEntryComponent;
  let fixture: ComponentFixture<LearningEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
