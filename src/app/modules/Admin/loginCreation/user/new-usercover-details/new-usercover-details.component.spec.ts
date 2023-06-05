import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUsercoverDetailsComponent } from './new-usercover-details.component';

describe('NewUsercoverDetailsComponent', () => {
  let component: NewUsercoverDetailsComponent;
  let fixture: ComponentFixture<NewUsercoverDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUsercoverDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUsercoverDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
