import { ComponentFixture, TestBed } from '@angular/core/testing';

import {NewNotificationDetailsComponent} from './new-notification-details.component'

describe('NewClausesDetailsComponent', () => {
  let component: NewNotificationDetailsComponent;
  let fixture: ComponentFixture<NewNotificationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewNotificationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNotificationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
