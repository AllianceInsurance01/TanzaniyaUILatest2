import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWarsDetailsComponent } from './new-wars-details.component';

describe('NewWarsDetailsComponent', () => {
  let component: NewWarsDetailsComponent;
  let fixture: ComponentFixture<NewWarsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWarsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWarsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
