import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningEntryItemComponent } from './learning-entry-item.component';

describe('LearningEntryItemComponent', () => {
  let component: LearningEntryItemComponent;
  let fixture: ComponentFixture<LearningEntryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningEntryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningEntryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
