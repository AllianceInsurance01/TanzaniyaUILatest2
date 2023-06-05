import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcolorDetailsComponent } from './newcolor-details.component';

describe('NewcolorDetailsComponent', () => {
  let component: NewcolorDetailsComponent;
  let fixture: ComponentFixture<NewcolorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewcolorDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcolorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
