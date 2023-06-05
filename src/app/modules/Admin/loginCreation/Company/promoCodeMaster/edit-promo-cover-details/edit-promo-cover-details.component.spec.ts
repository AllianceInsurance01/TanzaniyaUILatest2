import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPromoCoverDetailsComponent } from './edit-promo-cover-details.component';

describe('EditPromoCoverDetailsComponent', () => {
  let component: EditPromoCoverDetailsComponent;
  let fixture: ComponentFixture<EditPromoCoverDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPromoCoverDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPromoCoverDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
