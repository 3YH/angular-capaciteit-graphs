import { TestBed } from '@angular/core/testing';
import { ContactActivityConverterService } from './contact-activity-converter.service';

describe('ChartSerieConverterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactActivityConverterService = TestBed.get(
      ContactActivityConverterService
    );
    expect(service).toBeTruthy();
  });
});
