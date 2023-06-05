import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndorsementTypeDetailsComponent } from './endorsement-type-details.component';

describe('EndorsementTypeDetailsComponent', () => {
  let component: EndorsementTypeDetailsComponent;
  let fixture: ComponentFixture<EndorsementTypeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndorsementTypeDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndorsementTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
