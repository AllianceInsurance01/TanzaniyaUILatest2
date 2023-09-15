import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeCoverDetailsComponent } from './life-cover-details.component';

describe('LifeCoverDetailsComponent', () => {
  let component: LifeCoverDetailsComponent;
  let fixture: ComponentFixture<LifeCoverDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifeCoverDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifeCoverDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
