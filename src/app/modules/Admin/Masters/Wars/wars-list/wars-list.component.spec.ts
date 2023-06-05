import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarsListComponent } from './wars-list.component';

describe('WarsListComponent', () => {
  let component: WarsListComponent;
  let fixture: ComponentFixture<WarsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
