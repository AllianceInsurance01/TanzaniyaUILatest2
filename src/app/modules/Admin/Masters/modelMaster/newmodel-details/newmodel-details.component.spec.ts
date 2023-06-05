import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewmodelDetailsComponent } from './newmodel-details.component';

describe('NewmodelDetailsComponent', () => {
  let component: NewmodelDetailsComponent;
  let fixture: ComponentFixture<NewmodelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewmodelDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewmodelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
