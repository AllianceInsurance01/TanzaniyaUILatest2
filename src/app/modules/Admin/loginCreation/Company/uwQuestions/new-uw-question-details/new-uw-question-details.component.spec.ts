import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUwQuestionDetailsComponent } from './new-uw-question-details.component';

describe('NewUwQuestionDetailsComponent', () => {
  let component: NewUwQuestionDetailsComponent;
  let fixture: ComponentFixture<NewUwQuestionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUwQuestionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUwQuestionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
