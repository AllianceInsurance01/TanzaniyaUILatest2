import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEndorsementTypeDetailsComponent } from './new-endorsement-type-details.component';

describe('NewEndorsementTypeDetailsComponent', () => {
  let component: NewEndorsementTypeDetailsComponent;
  let fixture: ComponentFixture<NewEndorsementTypeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEndorsementTypeDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEndorsementTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
