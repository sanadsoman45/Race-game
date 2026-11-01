import { TestBed } from '@angular/core/testing';
import { CarSelection } from './car-selection.service';

describe('CarSelection', () => {
  let service: CarSelection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarSelection);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
