import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndorsementFieldMasterComponent } from './endorsement-field-master.component';

describe('EndorsementFieldMasterComponent', () => {
  let component: EndorsementFieldMasterComponent;
  let fixture: ComponentFixture<EndorsementFieldMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndorsementFieldMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndorsementFieldMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
