import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBrokercoverDetailsComponent } from './new-brokercover-details.component';

describe('NewBrokercoverDetailsComponent', () => {
  let component: NewBrokercoverDetailsComponent;
  let fixture: ComponentFixture<NewBrokercoverDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBrokercoverDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBrokercoverDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
