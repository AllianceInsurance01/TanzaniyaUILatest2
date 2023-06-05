import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBrokerbranchDetailsComponent } from './new-brokerbranch-details.component';

describe('NewBrokerbranchDetailsComponent', () => {
  let component: NewBrokerbranchDetailsComponent;
  let fixture: ComponentFixture<NewBrokerbranchDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBrokerbranchDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBrokerbranchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
