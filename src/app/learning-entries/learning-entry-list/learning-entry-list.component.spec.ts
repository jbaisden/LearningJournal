import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningEntryListComponent } from './learning-entry-list.component';

describe('LearningEntryListComponent', () => {
  let component: LearningEntryListComponent;
  let fixture: ComponentFixture<LearningEntryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningEntryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningEntryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
