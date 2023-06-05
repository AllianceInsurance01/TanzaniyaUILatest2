import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerCoverListComponent } from './broker-cover-list.component';

describe('BrokerCoverListComponent', () => {
  let component: BrokerCoverListComponent;
  let fixture: ComponentFixture<BrokerCoverListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerCoverListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerCoverListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
