import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerBranchListComponent } from './broker-branch-list.component';

describe('BrokerBranchListComponent', () => {
  let component: BrokerBranchListComponent;
  let fixture: ComponentFixture<BrokerBranchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerBranchListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerBranchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
