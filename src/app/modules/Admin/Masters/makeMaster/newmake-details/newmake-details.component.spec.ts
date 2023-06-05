import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewmakeDetailsComponent } from './newmake-details.component';

describe('NewmakeDetailsComponent', () => {
  let component: NewmakeDetailsComponent;
  let fixture: ComponentFixture<NewmakeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewmakeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewmakeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
