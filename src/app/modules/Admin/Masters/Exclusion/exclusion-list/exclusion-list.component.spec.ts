import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExclusionListComponent } from './exclusion-list.component';

describe('ExclusionListComponent', () => {
  let component: ExclusionListComponent;
  let fixture: ComponentFixture<ExclusionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExclusionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExclusionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
