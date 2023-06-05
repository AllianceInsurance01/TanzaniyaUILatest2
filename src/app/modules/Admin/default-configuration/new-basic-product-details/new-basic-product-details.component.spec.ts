import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBasicProductDetailsComponent } from './new-basic-product-details.component';

describe('NewBasicProductDetailsComponent', () => {
  let component: NewBasicProductDetailsComponent;
  let fixture: ComponentFixture<NewBasicProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBasicProductDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBasicProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
