import { TestBed } from '@angular/core/testing';

import { LearningEntryService } from './learning-entry.service';

describe('LearningEntryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LearningEntryService = TestBed.get(LearningEntryService);
    expect(service).toBeTruthy();
  });
});
