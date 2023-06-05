import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingUwQuestionsComponent } from './existing-uw-questions.component';

describe('ExistingUwQuestionsComponent', () => {
  let component: ExistingUwQuestionsComponent;
  let fixture: ComponentFixture<ExistingUwQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingUwQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingUwQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
