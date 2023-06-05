import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPolicyTypeDetailsComponent } from './new-policy-type-details.component';

describe('NewPolicyTypeDetailsComponent', () => {
  let component: NewPolicyTypeDetailsComponent;
  let fixture: ComponentFixture<NewPolicyTypeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPolicyTypeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPolicyTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
