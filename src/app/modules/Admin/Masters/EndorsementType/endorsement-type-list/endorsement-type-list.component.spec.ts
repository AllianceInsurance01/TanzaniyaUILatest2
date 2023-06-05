import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndorsementTypeListComponent } from './endorsement-type-list.component';

describe('EndorsementTypeListComponent', () => {
  let component: EndorsementTypeListComponent;
  let fixture: ComponentFixture<EndorsementTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndorsementTypeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndorsementTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
