import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingEndorsementsComponent } from './existing-endorsements.component';

describe('ExistingEndorsementsComponent', () => {
  let component: ExistingEndorsementsComponent;
  let fixture: ComponentFixture<ExistingEndorsementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingEndorsementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExistingEndorsementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
