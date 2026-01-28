import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerHomePage } from './customer-home-page';

describe('CustomerHomePage', () => {
  let component: CustomerHomePage;
  let fixture: ComponentFixture<CustomerHomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerHomePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerHomePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
