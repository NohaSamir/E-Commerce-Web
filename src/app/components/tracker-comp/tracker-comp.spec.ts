import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerComp } from './tracker-comp';

describe('TrackerComp', () => {
  let component: TrackerComp;
  let fixture: ComponentFixture<TrackerComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackerComp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackerComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
